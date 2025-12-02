import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";
import { ActivityIndicator, View, Text } from "react-native";
import { ComponentSearchTerms } from "../../../utils/componentHelper";
import { useComponentPagination } from "../../../hooks/useComponentPagination";

export function ChooseMotherboard({ navigation }: any) {
    const { data, loading, loadingMore, error, hasMore, sortOrder, searchQuery, handleLoadMore, handleSearch, handleSortChange } = 
        useComponentPagination(ComponentSearchTerms.MOTHERBOARD);

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
            sortOrder={sortOrder}
            hasMore={hasMore}
            isLoadingMore={loadingMore}
            searchValue={searchQuery}
        />
    );
}