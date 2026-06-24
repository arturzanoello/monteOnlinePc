import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "../../components/button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getPriceAlerts, PriceAlert } from '../../utils/priceAlertsHelper';
import { useFocusEffect } from '@react-navigation/native';
import { AddComponents } from '../../components/addComponents';

export function PriceAlerts({ navigation }: any) {
    const [alerts, setAlerts] = useState<PriceAlert[]>([]);
    const [loading, setLoading] = useState(true);

    const loadAlerts = async () => {
        setLoading(true);
        const data = await getPriceAlerts();
        setAlerts(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadAlerts();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back-outline" size={32} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.title}>Alertas de Preço</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
                ) : alerts.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>Você ainda não tem alertas configurados.</Text>
                        <Text style={styles.emptySubtext}>Navegue pelas peças e marque o sino de alerta para receber notificações de queda de preço.</Text>
                    </View>
                ) : (
                    <View style={{ width: '90%' }}>
                        {alerts.map((alert) => (
                            <AddComponents
                                key={alert.id}
                                componentData={alert}
                                hideSelectButton={true}
                                onAlertChanged={loadAlerts} // Recarrega se o usuário desmarcar o sino
                            />
                        ))}
                    </View>
                )}

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
