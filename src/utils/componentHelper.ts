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
    pageSize: number = 20
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

        const { data, error, count } = await query
            .range(from, to)
            .order('nome_produto', { ascending: true });

        if (error) {
            console.error(`[Supabase Error] ${searchTerm}:`, error);
            throw error;
        }

        const formattedData = data ? data.map(item => ({
            id: item.id,
            name: item.nome_produto,
            price: item.preco_pix || item.preco || 'N/A',
            description: formatSpecifications(item.especificacoes),
            shop: item.loja || 'N/A',
            url: item.url,
        })) : [];

        const hasMore = count ? (from + pageSize) < count : false;

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
    GPU: 'video',  // Ajustado para capturar "Placa de Vídeo" 
    MEMORY: 'memória',  // Com acento
    STORAGE: 'ssd',
    PSU: 'fonte',
    CASE: 'gabinete',
};
