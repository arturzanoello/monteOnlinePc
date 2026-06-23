import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";
import { ActivityIndicator, View, Text } from "react-native";
import { ComponentSearchTerms } from "../../../utils/componentHelper";
import { useComponentPagination } from "../../../hooks/useComponentPagination";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { getCpuSocket } from "../../../utils/hardwareCompatibility";

export function ChooseMotherboard({ navigation }: any) {
    const [socketFilter, setSocketFilter] = useState('');
    const [checkingSocket, setCheckingSocket] = useState(true);

    useEffect(() => {
        const checkCpuSocket = async () => {
            try {
                const cpuData = await AsyncStorage.getItem('@selected_cpu');
                if (cpuData) {
                    const cpu = JSON.parse(cpuData);
                    const socket = getCpuSocket(cpu);
                    if (socket) {
                        setSocketFilter(socket);
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
        useComponentPagination(ComponentSearchTerms.MOTHERBOARD, socketFilter);

    if (checkingSocket) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Verificando compatibilidade...</Text>
            </View>
        );
    }

    console.log('[ChooseMotherboard] Estado:', { 
        dataLength: data.length, 
        loading, 
        error,
        searchTerm: ComponentSearchTerms.MOTHERBOARD
    });

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

    // Se não tiver dados após carregar
    if (!loading && data.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    Nenhuma placa-mãe encontrada
                </Text>
                <Text style={{ color: '#666', textAlign: 'center' }}>
                    Ainda não há placas-mãe cadastradas no banco de dados.
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