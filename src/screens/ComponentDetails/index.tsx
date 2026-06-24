import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { Button } from "../../components/button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentData } from "../../utils/componentHelper";
import { ProductPreview } from '../../components/ProductPreview';

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
                <View style={styles.imageCard}>
                    <View style={styles.imageContainer}>
                        <ProductPreview productUrl={componentData.url} />
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.componentName}>{componentData.name}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Melhor Preço Encontrado (Pix)</Text>
                        <Text style={styles.priceValue}>{componentData.price}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="storefront" size={20} color="#666" />
                        <Text style={styles.shopText}>Vendido por: <Text style={{ fontWeight: 'bold' }}>{componentData.shop}</Text></Text>
                    </View>
                </View>

                <View style={styles.specsCard}>
                    <View style={styles.specsHeader}>
                        <Ionicons name="list" size={24} color="#333" />
                        <Text style={styles.specsTitle}>Especificações Técnicas</Text>
                    </View>
                    {componentData.description ? (
                        <Text style={styles.specsText}>{componentData.description}</Text>
                    ) : (
                        <Text style={styles.specsText}>Nenhuma especificação detalhada disponível.</Text>
                    )}
                </View>

                <View style={{ ...styles.actionsContainer, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <Button
                        label="Avaliar Peça"
                        onPress={() => navigation.navigate('ReviewComponent', {
                            componentId: componentData.id,
                            componentName: componentData.name
                        })}
                        style={{ flex: 1, backgroundColor: '#f59e0b', marginBottom: 15 }}
                    >
                        Avaliar Peça
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
    imageCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        overflow: 'hidden',
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginBottom: 20,
    },
    componentName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 20,
        lineHeight: 30,
    },
    priceContainer: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        fontWeight: '600',
    },
    priceValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 12,
        borderRadius: 12,
    },
    shopText: {
        fontSize: 16,
        color: '#444',
        marginLeft: 8,
    },
    specsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginBottom: 20,
    },
    specsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 12,
    },
    specsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginLeft: 8,
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
