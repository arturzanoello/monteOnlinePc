import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

export interface User {
    id: string;
    login: string;
    data_criacao?: string;
}

export interface PcComponent {
    id: string;
    name: string;
    price: string;
    quantity?: number;
}

export interface PcBuild {
    id: number | string; // Suporta tanto number quanto UUID string
    components: {
        cpu?: PcComponent | null;
        motherboard?: PcComponent | null;
        gpu?: PcComponent | null;
        memory?: PcComponent | null;
        storage?: PcComponent | null;
        psu?: PcComponent | null;
        case?: PcComponent | null;
        [key: string]: PcComponent | null | undefined; // Índice para tipos dinâmicos
    };
    totalPrice: number;
}

export const updateBuild = async (build: PcBuild) => {
    try {
        // Obtém o usuário logado
        const user = await getUser();
        
        if (!user) {
            throw new Error('Usuário não está logado');
        }

        // 1. Deleta todas as peças antigas da montagem
        const { error: deleteError } = await supabase
            .from('montagem_pecas')
            .delete()
            .eq('id_montagem', build.id);

        if (deleteError) {
            console.error('Erro ao deletar peças antigas:', deleteError);
            throw deleteError;
        }

        // 2. Insere as novas peças
        const componentInserts = [];
        
        for (const [componentType, component] of Object.entries(build.components)) {
            if (component && component.id) {
                componentInserts.push({
                    id_montagem: build.id,
                    id_peca: component.id,
                    quantidade: component.quantity || 1
                });
            }
        }

        if (componentInserts.length > 0) {
            const { error: insertError } = await supabase
                .from('montagem_pecas')
                .insert(componentInserts);

            if (insertError) {
                console.error('Erro ao inserir novas peças:', insertError);
                throw insertError;
            }
        }

        // 3. Atualiza o cache local
        const savedBuilds = await getBuildsFromStorage();
        const index = savedBuilds.findIndex(b => b.id === build.id);

        if (index !== -1) {
            savedBuilds[index] = build;
            await AsyncStorage.setItem('@saved_builds', JSON.stringify(savedBuilds));
        }

        return true;
    } catch (error) {
        console.error("Erro ao atualizar a montagem:", error);
        throw error;
    }
};

export const getNextBuildId = async (): Promise<number> => {
    try {
        // Para o Supabase, não precisamos gerar ID manualmente
        // O banco de dados gerará automaticamente
        // Esta função pode ser usada para outras finalidades
        const savedBuilds = await getBuildsFromStorage();

        const maxId = savedBuilds.reduce((max, build) =>
            build.id > max ? build.id : max, 0);

        return maxId + 1;
    } catch (error) {
        console.error("Erro ao obter próximo ID:", error);
        return 1;
    }
};

export const saveBuild = async (newBuild: PcBuild) => {
    try {
        // Obtém o usuário logado
        const user = await getUser();
        
        if (!user) {
            throw new Error('Usuário não está logado');
        }

        // 1. Cria a montagem na tabela 'montagens'
        const { data: montagemData, error: montagemError } = await supabase
            .from('montagens')
            .insert([{
                id_usuario: user.id,
                data_criacao: new Date().toISOString()
            }])
            .select()
            .single();

        if (montagemError) {
            console.error('Erro ao criar montagem:', montagemError);
            throw montagemError;
        }

        const montagemId = montagemData.id;

        // 2. Insere cada componente na tabela 'montagem_pecas'
        const componentInserts = [];
        
        for (const [componentType, component] of Object.entries(newBuild.components)) {
            if (component && component.id) {
                componentInserts.push({
                    id_montagem: montagemId,
                    id_peca: component.id,
                    quantidade: component.quantity || 1
                });
            }
        }

        if (componentInserts.length > 0) {
            const { error: pecasError } = await supabase
                .from('montagem_pecas')
                .insert(componentInserts);

            if (pecasError) {
                console.error('Erro ao inserir peças da montagem:', pecasError);
                // Se falhar ao inserir as peças, remove a montagem criada
                await supabase.from('montagens').delete().eq('id', montagemId);
                throw pecasError;
            }
        }

        // 3. Salva também no AsyncStorage para cache local
        const savedBuilds = await getBuildsFromStorage();
        const buildWithId = { ...newBuild, id: montagemId };
        const updatedBuilds = [...savedBuilds, buildWithId];
        await AsyncStorage.setItem('@saved_builds', JSON.stringify(updatedBuilds));

        return true;
    } catch (error) {
        console.error("Erro ao salvar build:", error);
        throw error;
    }
};

// Função auxiliar para pegar builds do storage local
const getBuildsFromStorage = async (): Promise<PcBuild[]> => {
    try {
        const savedBuilds = await AsyncStorage.getItem('@saved_builds');
        return savedBuilds ? JSON.parse(savedBuilds) : [];
    } catch (error) {
        console.error("Erro ao obter montagens do storage:", error);
        return [];
    }
};

export const getBuilds = async (): Promise<PcBuild[]> => {
    try {
        // Obtém o usuário logado
        const user = await getUser();
        
        if (!user) {
            console.log('Usuário não está logado, retornando builds do cache local');
            return await getBuildsFromStorage();
        }

        // Busca as montagens do usuário no Supabase
        const { data: montagens, error: montagensError } = await supabase
            .from('montagens')
            .select('id, data_criacao')
            .eq('id_usuario', user.id)
            .order('data_criacao', { ascending: false });

        if (montagensError) {
            console.error('Erro ao buscar montagens:', montagensError);
            return await getBuildsFromStorage();
        }

        if (!montagens || montagens.length === 0) {
            return [];
        }

        // Para cada montagem, busca suas peças
        const builds: PcBuild[] = [];

        for (const montagem of montagens) {
            const { data: pecasMontagem, error: pecasError } = await supabase
                .from('montagem_pecas')
                .select(`
                    id_peca,
                    quantidade,
                    pecas:id_peca (
                        id,
                        nome_produto,
                        preco_pix,
                        loja
                    )
                `)
                .eq('id_montagem', montagem.id);

            if (pecasError) {
                console.error('Erro ao buscar peças da montagem:', pecasError);
                continue;
            }

            // Monta o objeto de componentes
            const components: any = {
                cpu: null,
                motherboard: null,
                gpu: null,
                memory: null,
                storage: null,
                psu: null,
                case: null
            };

            let totalPrice = 0;

            if (pecasMontagem) {
                for (const item of pecasMontagem) {
                    if (item.pecas) {
                        const peca = Array.isArray(item.pecas) ? item.pecas[0] : item.pecas;
                        
                        // Formata o preço no padrão brasileiro
                        const priceNum = peca.preco_pix || 0;
                        const formattedPrice = priceNum.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });
                        
                        const component: PcComponent = {
                            id: peca.id,
                            name: peca.nome_produto,
                            price: 'R$ ' + formattedPrice,
                            quantity: item.quantidade
                        };

                        // Determina o tipo do componente baseado no nome
                        const nomeLower = peca.nome_produto.toLowerCase();
                        if (nomeLower.includes('processador')) {
                            components.cpu = component;
                        } else if (nomeLower.includes('placa-mãe') || nomeLower.includes('placa mãe')) {
                            components.motherboard = component;
                        } else if (nomeLower.includes('placa de vídeo')) {
                            components.gpu = component;
                        } else if (nomeLower.includes('memória')) {
                            components.memory = component;
                        } else if (nomeLower.includes('ssd') || nomeLower.includes('armazenamento')) {
                            components.storage = component;
                        } else if (nomeLower.includes('fonte')) {
                            components.psu = component;
                        } else if (nomeLower.includes('gabinete')) {
                            components.case = component;
                        }

                        // Calcula o preço usando o valor numérico
                        totalPrice += priceNum * (component.quantity || 1);
                    }
                }
            }

            builds.push({
                id: montagem.id,
                components,
                totalPrice
            });
        }

        // Atualiza o cache local
        await AsyncStorage.setItem('@saved_builds', JSON.stringify(builds));

        return builds;
    } catch (error) {
        console.error("Erro ao obter montagens salvas:", error);
        return await getBuildsFromStorage();
    }
};

export const deleteBuild = async (buildId: number | string): Promise<boolean> => {
    try {
        // Obtém o usuário logado
        const user = await getUser();
        
        if (!user) {
            console.error('Usuário não está logado');
            return false;
        }

        // 1. Deleta as peças da montagem
        const { error: pecasError } = await supabase
            .from('montagem_pecas')
            .delete()
            .eq('id_montagem', buildId);

        if (pecasError) {
            console.error('Erro ao deletar peças da montagem:', pecasError);
            throw pecasError;
        }

        // 2. Deleta a montagem
        const { error: montagemError } = await supabase
            .from('montagens')
            .delete()
            .eq('id', buildId)
            .eq('id_usuario', user.id);

        if (montagemError) {
            console.error('Erro ao deletar montagem:', montagemError);
            throw montagemError;
        }

        // 3. Remove do cache local
        const savedBuilds = await getBuildsFromStorage();
        const updatedBuilds = savedBuilds.filter(build => build.id !== buildId);
        await AsyncStorage.setItem('@saved_builds', JSON.stringify(updatedBuilds));

        return true;
    } catch (error) {
        console.error("Erro ao deletar montagem:", error);
        return false;
    }
};

// Funções para gerenciar o usuário logado
export const saveUser = async (user: User): Promise<boolean> => {
    try {
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        return true;
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        return false;
    }
};

export const getUser = async (): Promise<User | null> => {
    try {
        const userData = await AsyncStorage.getItem('@user');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Erro ao obter usuário:", error);
        return null;
    }
};

export const removeUser = async (): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem('@user');
        return true;
    } catch (error) {
        console.error("Erro ao remover usuário:", error);
        return false;
    }
};

export const isUserLoggedIn = async (): Promise<boolean> => {
    try {
        const user = await getUser();
        return user !== null;
    } catch (error) {
        console.error("Erro ao verificar login:", error);
        return false;
    }
};