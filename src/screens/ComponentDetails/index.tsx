import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { Button } from "../../components/button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentData } from "../../utils/componentHelper";

export function ComponentDetails({ route, navigation }: any) {
    const { componentData } = route.params as { componentData: ComponentData };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    size={32}
                    color="black"
                    onPress={() => navigation.goBack()}
                    style={{ position: 'absolute', left: 20, zIndex: 1 }}
                />
                <Text style={styles.title}>Detalhes da Peça</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="hardware-chip-outline" size={60} color="#2196F3" />
                    </View>

                    <Text style={styles.componentName}>{componentData.name}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Preço atual (Pix)</Text>
                        <Text style={styles.priceValue}>{componentData.price}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="storefront-outline" size={20} color="#666" />
                        <Text style={styles.shopText}>Loja: {componentData.shop}</Text>
                    </View>
                </View>

                <View style={styles.specsCard}>
                    <Text style={styles.specsTitle}>Especificações Técnicas</Text>
                    {componentData.description ? (
                        <Text style={styles.specsText}>{componentData.description}</Text>
                    ) : (
                        <Text style={styles.specsText}>Nenhuma especificação detalhada disponível.</Text>
                    )}
                </View>

                <View style={styles.actionsContainer}>
                    <Button
                        label="Avaliar Peça"
                        onPress={() => navigation.navigate('ReviewComponent', {
                            componentId: componentData.id,
                            componentName: componentData.name
                        })}
                        style={{ backgroundColor: '#f59e0b', marginBottom: 15 }}
                    >
                        Avaliar Peça
                    </Button>

                    <Button
                        label="Voltar"
                        onPress={() => navigation.goBack()}
                    >
                        Voltar
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#FAFAFA',
        position: 'relative',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A'
    },
    container: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    componentName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 15,
    },
    priceContainer: {
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 12,
        width: '100%',
        marginBottom: 15,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    priceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    shopText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 8,
    },
    specsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        marginBottom: 20,
    },
    specsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 10,
    },
    specsText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 24,
    },
    actionsContainer: {
        marginTop: 10,
    }
});
