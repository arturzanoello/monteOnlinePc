import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { fetchComponentsByType, ComponentData } from '../utils/componentHelper';

export const useComponentPagination = (
    componentSearchTerm: string,
    hiddenFilter: string = '',
    specsKey?: string,
    specsFilter?: string
) => {
    const [data, setData] = useState<ComponentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortMethod, setSortMethod] = useState<'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'none'>('none');
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const isLoadingRef = useRef(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const fetchData = async (pageNum: number, order: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'none', min?: number, max?: number, append: boolean = false) => {
        try {
            const query = ''; // Sempre busca tudo no servidor e filtra no front
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
                order,
                min,
                max,
                hiddenFilter,
                specsKey,
                specsFilter
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
        setPage(0);
        setHasMore(true);
        fetchData(0, sortMethod, minPrice, maxPrice, false);
        
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [componentSearchTerm, hiddenFilter, specsKey, specsFilter]);

    const handleLoadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            fetchData(page + 1, sortMethod, minPrice, maxPrice, true);
        }
    }, [page, loadingMore, hasMore, sortMethod, minPrice, maxPrice]);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        // Filtro agora é 100% local, não precisa chamar fetchData
    }, []);

    const handleSortChange = useCallback((method: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'none') => {
        setSortMethod(method);
        setPage(0);
        setHasMore(true);
        fetchData(0, method, minPrice, maxPrice, false);
    }, [minPrice, maxPrice]);

    const handlePriceFilter = useCallback((min?: number, max?: number) => {
        setMinPrice(min);
        setMaxPrice(max);
        setPage(0);
        setHasMore(true);
        fetchData(0, sortMethod, min, max, false);
    }, [sortMethod]);

    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return data;
        const lowerQuery = searchQuery.toLowerCase();
        return data.filter(item => 
            item.name.toLowerCase().includes(lowerQuery)
        );
    }, [data, searchQuery]);

    return {
        data: filteredData,
        loading,
        loadingMore,
        error,
        hasMore,
        sortMethod,
        searchQuery,
        handleLoadMore,
        handleSearch,
        handleSortChange,
        handlePriceFilter,
        minPrice,
        maxPrice,
    };
};
