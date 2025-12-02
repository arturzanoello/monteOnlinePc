import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchComponentsByType, ComponentData } from '../utils/componentHelper';

export const useComponentPagination = (componentSearchTerm: string) => {
    const [data, setData] = useState<ComponentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Padrão: mais caros
    const isLoadingRef = useRef(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const fetchData = async (pageNum: number, query: string, order: 'asc' | 'desc', append: boolean = false) => {
        try {
            console.log('[fetchData] Iniciando:', { pageNum, query, order, append, isLoadingRef: isLoadingRef.current });
            
            // Evita chamadas duplicadas usando ref
            if (isLoadingRef.current) {
                console.log('[fetchData] Evitando chamada duplicada');
                return;
            }

            isLoadingRef.current = true;

            if (pageNum === 0) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const result = await fetchComponentsByType(
                componentSearchTerm,
                query,
                pageNum,
                20,
                order
            );

            console.log('[fetchData] Resultado:', { 
                dataLength: result.data.length, 
                hasMore: result.hasMore,
                primeiros: result.data.slice(0, 2).map(i => i.name)
            });

            if (append) {
                // Remove duplicatas ao adicionar novos itens
                setData(prev => {
                    const existingIds = new Set(prev.map(item => item.id));
                    const newItems = result.data.filter(item => !existingIds.has(item.id));
                    console.log('[fetchData] Append:', { prevLength: prev.length, newItemsLength: newItems.length });
                    return [...prev, ...newItems];
                });
            } else {
                console.log('[fetchData] Setando data:', result.data.length);
                setData(result.data);
            }
            
            setHasMore(result.hasMore);
            setPage(pageNum);
            setError(null);
        } catch (error: any) {
            console.error(`Erro ao buscar ${componentSearchTerm}:`, error);
            setError(`Erro ao carregar ${componentSearchTerm}`);
        } finally {
            console.log('[fetchData] Finalizando');
            setLoading(false);
            setLoadingMore(false);
            isLoadingRef.current = false;
        }
    };

    useEffect(() => {
        fetchData(0, '', sortOrder);
        
        // Cleanup do timeout ao desmontar
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [componentSearchTerm]);

    const handleLoadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            fetchData(page + 1, searchQuery, sortOrder, true);
        }
    }, [page, loadingMore, hasMore, searchQuery, sortOrder]);

    const handleSearch = useCallback((query: string) => {
        // Atualiza o valor imediatamente para UI responsiva
        setSearchQuery(query);
        
        // Limpa timeout anterior
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Debounce de 300ms para chamada ao banco
        searchTimeoutRef.current = setTimeout(() => {
            setPage(0);
            setHasMore(true);
            fetchData(0, query, sortOrder, false);
        }, 300);
    }, [sortOrder]);

    const handleSortChange = useCallback((order: 'asc' | 'desc') => {
        setSortOrder(order);
        setPage(0);
        setHasMore(true);
        fetchData(0, searchQuery, order, false);
    }, [searchQuery]);

    return {
        data,
        loading,
        loadingMore,
        error,
        hasMore,
        sortOrder,
        searchQuery,
        handleLoadMore,
        handleSearch,
        handleSortChange,
    };
};
