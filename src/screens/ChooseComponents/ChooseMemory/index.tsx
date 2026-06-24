import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";
import { ActivityIndicator, View, Text } from "react-native";
import { ComponentSearchTerms } from "../../../utils/componentHelper";
import { useComponentPagination } from "../../../hooks/useComponentPagination";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { getRamFilterByMotherboard } from "../../../utils/hardwareCompatibility";

export function ChooseMemory({ navigation }: any) {
    const [specsKey, setSpecsKey] = useState<string | undefined>(undefined);
    const [specsFilter, setSpecsFilter] = useState<string | undefined>(undefined);
    const [checkingCompat, setCheckingCompat] = useState(true);

    useEffect(() => {
        const checkMotherboardCompat = async () => {
            try {
                const mbData = await AsyncStorage.getItem('@selected_motherboard');
                if (mbData) {
                    const mb = JSON.parse(mbData);
                    // Usa o ID da placa-mãe para buscar o DDR diretamente no banco
                    if (mb.id) {
                        const filter = await getRamFilterByMotherboard(mb.id);
                        if (filter) {
                            setSpecsKey(filter.specsKey);       // 'Velocidade'
                            setSpecsFilter(filter.specsFilter);  // ex: 'DDR5'
                        }
                    }
                }
            } catch (error) {
                console.error('Erro ao ler Placa-Mãe', error);
            } finally {
                setCheckingCompat(false);
            }
        };
        checkMotherboardCompat();
    }, []);

    const { data, loading, loadingMore, error, hasMore, sortMethod, searchQuery, handleLoadMore, handleSearch, handleSortChange, handlePriceFilter, minPrice, maxPrice } =
        useComponentPagination(ComponentSearchTerms.MEMORY, '', specsKey, specsFilter);

    if (checkingCompat) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Verificando compatibilidade...</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Carregando memórias...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            </View>
        );
    }

    if (!loading && data.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    Nenhuma memória compatível encontrada
                </Text>
                <Text style={{ color: '#666', textAlign: 'center' }}>
                    {specsFilter
                        ? `Não há memórias ${specsFilter} cadastradas.`
                        : 'Ainda não há memórias cadastradas no banco de dados.'}
                </Text>
                <Text style={{ color: '#666', textAlign: 'center', marginTop: 10 }}>
                    Por enquanto, você pode pular esta etapa.
                </Text>
            </View>
        );
    }

    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="memory"
            title="Memória RAM"
            nextScreen="ChooseGpu"
            componentsData={data}
            onLoadMore={handleLoadMore}
            onSearch={handleSearch}
            onSortChange={handleSortChange}
            onPriceFilterChange={handlePriceFilter}
            sortMethod={sortMethod}
            hasMore={hasMore}
            isLoadingMore={loadingMore}
            searchValue={searchQuery}
            minPrice={minPrice}
            maxPrice={maxPrice}
        />
    )
}