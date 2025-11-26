import { supabase } from './supabase';

export interface ComponentData {
    id: string;
    name: string;
    price: string;
    description: string;
    shop: string;
    url?: string;
}

interface FetchOptions {
    searchTerm: string;
    searchQuery?: string;
    page?: number;
    pageSize?: number;
}

export const fetchComponentsByType = async (
    searchTerm: string,
    searchQuery: string = '',
    page: number = 0,
    pageSize: number = 20,
    sortOrder: 'asc' | 'desc' = 'asc'
): Promise<{ data: ComponentData[], hasMore: boolean }> => {
    try {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        // Construir a query base
        let query = supabase
            .from('pecas')
            .select('*', { count: 'exact' });

        // Aplicar filtros de busca - sempre busca pelo tipo primeiro
        query = query.ilike('nome_produto', `%${searchTerm}%`);
        
        // Se tem busca adicional do usuário, adiciona outro filtro
        if (searchQuery.trim()) {
            query = query.ilike('nome_produto', `%${searchQuery}%`);
        }

        // Buscar TODOS os dados primeiro (sem paginação) para ordenar corretamente
        const { data: allData, error: fetchError } = await query;

        if (fetchError) {
            console.error(`[Supabase Error] ${searchTerm}:`, fetchError);
            throw fetchError;
        }

        // Ordenar os dados em memória considerando preco_pix_num
        const sortedData = allData?.sort((a, b) => {
            const priceA = a.preco_pix_num || 0;
            const priceB = b.preco_pix_num || 0;
            return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        }) || [];

        // Agora aplica a paginação nos dados já ordenados
        const paginatedData = sortedData.slice(from, to + 1);
        const totalCount = sortedData.length;

        console.log(`[ComponentHelper] Dados ordenados para ${searchTerm}:`, {
            total: totalCount,
            page,
            from,
            to,
            sortOrder,
            primeiros: paginatedData.slice(0, 2).map(item => ({
                nome: item.nome_produto,
                preco_pix_num: item.preco_pix_num
            }))
        });

        const formattedData = paginatedData ? paginatedData
            .map(item => {
            // Pega o preço do campo preco_pix_num
            const priceNum = item.preco_pix_num;
            
            // Se não tem preço válido
            if (!priceNum || priceNum <= 0) {
                return {
                    id: item.id,
                    name: item.nome_produto,
                    price: 'N/A',
                    description: formatSpecifications(item.especificacoes),
                    shop: item.loja || 'N/A',
                    url: item.url,
                };
            }
            
            // Formata o número no padrão brasileiro: R$ 4.199,90
            const formattedPrice = priceNum.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            return {
                id: item.id,
                name: item.nome_produto,
                price: 'R$ ' + formattedPrice,
                description: formatSpecifications(item.especificacoes),
                shop: item.loja || 'N/A',
                url: item.url,
            };
        })
        .filter(item => item.price !== 'N/A' && item.shop !== 'N/A') // Remove itens sem preço ou sem loja
        : [];

        const hasMore = (to + 1) < totalCount;

        return { data: formattedData, hasMore };
    } catch (error: any) {
        console.error(`[Fatal Error] ${searchTerm}:`, error);
        throw error;
    }
};

const formatSpecifications = (specs: any): string => {
    if (!specs) return 'Sem especificações';
    
    try {
        const specsObj = typeof specs === 'string' ? JSON.parse(specs) : specs;
        const relevant = [];
        
        // Extrai especificações relevantes comuns
        if (specsObj['Núcleos Turbo'] || specsObj['Núcleos']) {
            relevant.push(`${specsObj['Núcleos Turbo'] || specsObj['Núcleos']} núcleos`);
        }
        if (specsObj['Frequência Turbo'] || specsObj['Frequência']) {
            relevant.push(`${specsObj['Frequência Turbo'] || specsObj['Frequência']} Max`);
        }
        if (specsObj['Threads']) {
            relevant.push(`${specsObj['Threads']} Threads`);
        }
        if (specsObj['Capacidade']) {
            relevant.push(specsObj['Capacidade']);
        }
        if (specsObj['Velocidade']) {
            relevant.push(specsObj['Velocidade']);
        }
        if (specsObj['Memória']) {
            relevant.push(specsObj['Memória']);
        }
        if (specsObj['Potência']) {
            relevant.push(specsObj['Potência']);
        }
        
        return relevant.length > 0 ? relevant.join(', ') : 'Sem especificações';
    } catch {
        return 'Sem especificações';
    }
};

// Termos de busca para cada tipo de componente
export const ComponentSearchTerms = {
    CPU: 'processador',
    MOTHERBOARD: 'placa',  // Ajustado para capturar "Placa-Mãe" ou "Placa Mãe"
    GPU: 'Placa de Vídeo',  // Ajustado para capturar "Placa de Vídeo" 
    MEMORY: 'memória',  // Com acento
    STORAGE: 'ssd',
    PSU: 'fonte',
    CASE: 'gabinete',
};
