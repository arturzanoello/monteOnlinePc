import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";
import { ActivityIndicator, View, Text } from "react-native";
import { ComponentSearchTerms } from "../../../utils/componentHelper";
import { useComponentPagination } from "../../../hooks/useComponentPagination";

export function ChooseCpu({ navigation }: any) {
    const {
        data,
        loading,
        loadingMore,
        error,
        hasMore,
        sortOrder,
        handleLoadMore,
        handleSearch,
        handleSortChange,
    } = useComponentPagination(ComponentSearchTerms.CPU);

    console.log('[ChooseCpu] Estado:', { 
        dataLength: data.length, 
        loading, 
        loadingMore, 
        error,
        hasMore,
        primeiros: data.slice(0, 2).map(i => i?.name)
    });

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Carregando processadores...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }

    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="cpu"
            title="Processadores"
            nextScreen="ChooseMotherboard"
            componentsData={data}
            onLoadMore={handleLoadMore}
            onSearch={handleSearch}
            onSortChange={handleSortChange}
            sortOrder={sortOrder}
            hasMore={hasMore}
            isLoadingMore={loadingMore}
        />
    );
}