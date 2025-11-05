import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";
import { ActivityIndicator, View, Text } from "react-native";
import { ComponentSearchTerms } from "../../../utils/componentHelper";
import { useComponentPagination } from "../../../hooks/useComponentPagination";

export function ChooseStorage({ navigation }: any) {
    const { data, loading, loadingMore, error, hasMore, handleLoadMore, handleSearch } = 
        useComponentPagination(ComponentSearchTerms.STORAGE);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Carregando armazenamento...</Text>
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
                    Nenhum armazenamento encontrado
                </Text>
                <Text style={{ color: '#666', textAlign: 'center' }}>
                    Ainda não há SSDs/HDs cadastrados no banco de dados.
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
            componentType="storage"
            title="Armazenamento"
            nextScreen="ChoosePsu"
            componentsData={data}
            onLoadMore={handleLoadMore}
            onSearch={handleSearch}
            hasMore={hasMore}
            isLoadingMore={loadingMore}
        />
    )
}