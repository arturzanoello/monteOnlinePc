import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";
import { ActivityIndicator, View, Text } from "react-native";
import { ComponentSearchTerms } from "../../../utils/componentHelper";
import { useComponentPagination } from "../../../hooks/useComponentPagination";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { getMotherboardFilterByCpu } from "../../../utils/hardwareCompatibility";

export function ChooseMotherboard({ navigation }: any) {
    const [specsKey, setSpecsKey] = useState<string | undefined>(undefined);
    const [specsFilter, setSpecsFilter] = useState<string | undefined>(undefined);
    const [checkingSocket, setCheckingSocket] = useState(true);

    useEffect(() => {
        const checkCpuSocket = async () => {
            try {
                const cpuData = await AsyncStorage.getItem('@selected_cpu');
                if (cpuData) {
                    const cpu = JSON.parse(cpuData);
                    // Usa o ID da peça para buscar o socket diretamente no banco
                    if (cpu.id) {
                        const filter = await getMotherboardFilterByCpu(cpu.id);
                        if (filter) {
                            setSpecsKey(filter.specsKey);       // 'Socket do processador'
                            setSpecsFilter(filter.specsFilter);  // ex: 'LGA 1700'
                        }
                    }
                }
            } catch (error) {
                console.error('Erro ao ler CPU', error);
            } finally {
                setCheckingSocket(false);
            }
        };
        checkCpuSocket();
    }, []);

    const { data, loading, loadingMore, error, hasMore, sortMethod, searchQuery, handleLoadMore, handleSearch, handleSortChange, handlePriceFilter, minPrice, maxPrice } =
        useComponentPagination(ComponentSearchTerms.MOTHERBOARD, '', specsKey, specsFilter);

    if (checkingSocket) {
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
                <Text style={{ marginTop: 10 }}>Carregando placas-mãe...</Text>
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
                    Nenhuma placa-mãe compatível encontrada
                </Text>
                <Text style={{ color: '#666', textAlign: 'center' }}>
                    {specsFilter
                        ? `Não há placas-mãe com socket "${specsFilter}" cadastradas.`
                        : 'Ainda não há placas-mãe cadastradas no banco de dados.'}
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
            componentType="motherboard"
            title="Placas-mãe"
            nextScreen="ChooseMemory"
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
    );
}