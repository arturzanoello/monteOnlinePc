import { supabase } from './supabase';

export interface ComponentData {
    id: string;
    name: string;
    price: string;
    description: string;
    shop: string;
    url?: string;
    especificacoes?: string;
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
    sortMethod: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' = 'price_desc',
    minPrice?: number,
    maxPrice?: number,
    hiddenFilter: string = ''
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

        // Filtro oculto do sistema (compatibilidade de socket/ram)
        if (hiddenFilter && hiddenFilter.trim()) {
            query = query.ilike('nome_produto', `%${hiddenFilter}%`);
        }

        if (minPrice !== undefined) {
            query = query.gte('preco_pix', minPrice);
        }
        if (maxPrice !== undefined) {
            query = query.lte('preco_pix', maxPrice);
        }

        // Adicionar ordenação ao banco de dados
        if (sortMethod.startsWith('price')) {
            query = query.order('preco_pix', { ascending: sortMethod === 'price_asc', nullsFirst: false });
        } else if (sortMethod.startsWith('name')) {
            query = query.order('nome_produto', { ascending: sortMethod === 'name_asc', nullsFirst: false });
        }
        
        // Aplicar a paginação na própria query
        query = query.range(from, to);

        // Buscar dados paginados do banco
        const { data: paginatedData, count: totalCount, error: fetchError } = await query;

        if (fetchError) {
            console.error(`[Supabase Error] ${searchTerm}:`, fetchError);
            throw fetchError;
        }

        console.log(`[ComponentHelper] Dados retornados para ${searchTerm}:`, {
            total: totalCount,
            page,
            from,
            to,
            sortMethod,
            primeiros: paginatedData?.slice(0, 2).map(item => ({
                nome: item.nome_produto,
                preco_pix: item.preco_pix
            }))
        });

        const formattedData = paginatedData ? paginatedData
            .map(item => {
            // Pega o preço do campo preco_pix_num
            const priceNum = item.preco_pix;
            
            // Se não tem preço válido
            if (!priceNum || priceNum <= 0) {
                return {
                    id: item.id,
                    name: item.nome_produto,
                    price: 'N/A',
                    description: formatSpecifications(item.especificacoes),
                    especificacoes: item.especificacoes,
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
                especificacoes: item.especificacoes,
                shop: item.loja || 'N/A',
                url: item.url,
            };
        })
        .filter(item => item.price !== 'N/A' && item.shop !== 'N/A') // Remove itens sem preço ou sem loja
        : [];

        const hasMore = totalCount ? (to + 1) < totalCount : false;

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
    MOTHERBOARD: 'Placa-Mãe',
    GPU: 'Placa de Vídeo',
    MEMORY: 'memória',  // Com acento
    STORAGE: 'ssd',
    PSU: 'fonte',
    CASE: 'gabinete',
};
