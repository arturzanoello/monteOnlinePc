import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";
import { ActivityIndicator, View, Text } from "react-native";
import { ComponentSearchTerms } from "../../../utils/componentHelper";
import { useComponentPagination } from "../../../hooks/useComponentPagination";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { getMotherboardSupportedDdr, getMotherboardSocket } from "../../../utils/hardwareCompatibility";

export function ChooseMemory({ navigation }: any) {
    const [ddrFilter, setDdrFilter] = useState('');
    const [checkingCompat, setCheckingCompat] = useState(true);

    useEffect(() => {
        const checkMotherboardCompat = async () => {
            try {
                const mbData = await AsyncStorage.getItem('@selected_motherboard');
                if (mbData) {
                    const mb = JSON.parse(mbData);
                    const mbSocket = getMotherboardSocket(mb);
                    const ddr = getMotherboardSupportedDdr(mb, mbSocket);
                    if (ddr && ddr !== 'LGA1700_UNDEFINED') {
                        setDdrFilter(ddr);
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
        useComponentPagination(ComponentSearchTerms.MEMORY, ddrFilter);

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

    // Se não tiver dados após carregar
    if (!loading && data.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    Nenhuma memória encontrada
                </Text>
                <Text style={{ color: '#666', textAlign: 'center' }}>
                    Ainda não há memórias cadastradas no banco de dados.
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