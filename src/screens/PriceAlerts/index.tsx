import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "../../components/button";
import Ionicons from '@expo/vector-icons/Ionicons';

export function PriceAlerts({ navigation }: any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back-outline" size={32} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.title}>Alertas de Preço</Text>
                </View>

                <View style={styles.emptyState}>
                    <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>Você ainda não tem alertas configurados.</Text>
                    <Text style={styles.emptySubtext}>Navegue pelas peças e marque "Avisar quando baixar" para receber notificações de queda de preço.</Text>
                </View>

                <Button label="Voltar" onPress={() => navigation.goBack()} style={{ marginTop: 40, width: '90%' }}>Voltar</Button>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', paddingBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 20, marginBottom: 30 },
    title: { fontSize: 24, fontWeight: 'bold', marginLeft: 15 },
    emptyState: { width: '90%', alignItems: 'center', marginTop: 50, padding: 20 },
    emptyText: { fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', color: '#333' },
    emptySubtext: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 10, lineHeight: 20 }
});
