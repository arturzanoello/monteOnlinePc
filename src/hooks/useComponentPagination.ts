import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchComponentsByType, ComponentData } from '../utils/componentHelper';

export const useComponentPagination = (componentSearchTerm: string, defaultSearchQuery: string = '') => {
    const [data, setData] = useState<ComponentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
    const [sortMethod, setSortMethod] = useState<'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'>('price_desc');
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const isLoadingRef = useRef(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const fetchData = async (pageNum: number, query: string, order: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc', min?: number, max?: number, append: boolean = false) => {
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
                order,
                min,
                max
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
        fetchData(0, '', sortMethod, minPrice, maxPrice);
        
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [componentSearchTerm]);

    const handleLoadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            fetchData(page + 1, searchQuery, sortMethod, minPrice, maxPrice, true);
        }
    }, [page, loadingMore, hasMore, searchQuery, sortMethod, minPrice, maxPrice]);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            setPage(0);
            setHasMore(true);
            fetchData(0, query, sortMethod, minPrice, maxPrice, false);
        }, 300);
    }, [sortMethod, minPrice, maxPrice]);

    const handleSortChange = useCallback((method: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc') => {
        setSortMethod(method);
        setPage(0);
        setHasMore(true);
        fetchData(0, searchQuery, method, minPrice, maxPrice, false);
    }, [searchQuery, minPrice, maxPrice]);

    const handlePriceFilter = useCallback((min?: number, max?: number) => {
        setMinPrice(min);
        setMaxPrice(max);
        setPage(0);
        setHasMore(true);
        fetchData(0, searchQuery, sortMethod, min, max, false);
    }, [searchQuery, sortMethod]);

    return {
        data,
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
