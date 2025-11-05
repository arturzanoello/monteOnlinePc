import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddComponents } from "../addComponents";
import Feather from "@expo/vector-icons/Feather";

type ComponentType = 'cpu' | 'motherboard' | 'memory' | 'gpu' | 'storage' | 'psu' | 'case';

interface ChooseComponentScreenProps {
    navigation: any;
    componentType: ComponentType;
    title: string;
    nextScreen: string;
    componentsData: {
        id: string;
        name: string;
        price: string;
        description: string;
        shop: string;
    }[];
    onLoadMore?: () => void;
    onSearch?: (query: string) => void;
    hasMore?: boolean;
    isLoadingMore?: boolean;
}

export function ChooseComponentScreen({
    navigation,
    componentType,
    title,
    nextScreen,
    componentsData,
    onLoadMore,
    onSearch,
    hasMore = false,
    isLoadingMore = false
}: ChooseComponentScreenProps) {

    const [priceExpensive, setPriceExpensive] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const parsePrice = (priceString: string): number => {
        if (!priceString) return 0;
        const cleaned = priceString
            .replace('R$', '')
            .replace(/\s/g, '')
            .replace(/\./g, '')
            .replace(',', '.');
        return parseFloat(cleaned) || 0;
    };

    const saveSelectedComponent = async (component: any) => {
        try {
            await AsyncStorage.setItem(
                `@selected_${componentType}`,
                JSON.stringify(component)
            );
            navigation.navigate(nextScreen);
        } catch (e) {
            console.error(`Erro ao salvar ${componentType}:`, e);
        }
    };

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        // Carrega mais quando estiver a 300px do final (antecipado)
        const paddingToBottom = 300;
        
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            if (hasMore && !isLoadingMore && onLoadMore) {
                onLoadMore();
            }
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        
        // Limpa o timeout anterior
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Cria um novo timeout para buscar após 500ms de inatividade
        searchTimeoutRef.current = setTimeout(() => {
            if (onSearch) {
                onSearch(text);
            }
        }, 500);
    };

    // Limpa o timeout quando o componente desmonta
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView 
                style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center' }}
                onScroll={handleScroll}
                scrollEventThrottle={100}
            >
                <View style={{ width: '90%' }}>
                    <View style={styles.header}>
                        <Ionicons
                            name="arrow-back-outline"
                            size={32}
                            color="black"
                            onPress={() => navigation.goBack()}
                        />
                        <Feather name="monitor" size={32} color="black" />
                    </View>

                    <Text style={styles.textMain}>{title}</Text>

                    {/* Campo de busca */}
                    <View style={{ marginVertical: 15 }}>
                        <View style={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            borderColor: '#e0e0e0',
                        }}>
                            <Ionicons name="search" size={20} color="#666" />
                            <TextInput
                                style={{
                                    flex: 1,
                                    padding: 12,
                                    fontSize: 16,
                                    color: '#333',
                                }}
                                placeholder="Buscar produtos..."
                                placeholderTextColor="#999"
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                            {searchQuery.length > 0 && (
                                <Pressable onPress={() => handleSearch('')}>
                                    <Ionicons name="close-circle" size={20} color="#666" />
                                </Pressable>
                            )}
                        </View>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <Pressable
                            style={styles.priceButton}
                            onPress={() => setPriceExpensive(!priceExpensive)}
                        >
                            {priceExpensive ? (
                                <>
                                    <Text style={styles.priceButtonText}>Preços mais altos</Text>
                                    <Ionicons name="arrow-up" size={26} color="black" />
                                </>
                            ) : (
                                <>
                                    <Text style={styles.priceButtonText}>Preços mais baixos</Text>
                                    <Ionicons name="arrow-down" size={26} color="black" />
                                </>
                            )}
                        </Pressable>
                    </View>

                    {componentsData
                        .slice()
                        .sort((a, b) => {
                            const priceA = parsePrice(a.price);
                            const priceB = parsePrice(b.price);
                            return priceExpensive ? priceB - priceA : priceA - priceB;
                        })
                        .map((component) => (
                            <AddComponents
                                key={component.id}
                                product={component.name}
                                price={component.price}
                                description={component.description}
                                shop={component.shop}
                                onPress={() => saveSelectedComponent(component)}
                            />
                        ))
                    }

                    {/* Loading indicator para carregar mais */}
                    {isLoadingMore && (
                        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                            <ActivityIndicator size="small" color="#0000ff" />
                            <Text style={{ marginTop: 10, color: '#666' }}>Carregando mais...</Text>
                        </View>
                    )}

                    {/* Mensagem quando não há mais itens */}
                    {!hasMore && componentsData.length > 0 && (
                        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                            <Text style={{ color: '#666', fontSize: 14 }}>Todos os itens foram carregados</Text>
                        </View>
                    )}

                    {/* Mensagem quando não há resultados */}
                    {componentsData.length === 0 && !isLoadingMore && (
                        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                            <Ionicons name="search-outline" size={48} color="#ccc" />
                            <Text style={{ color: '#999', fontSize: 16, marginTop: 10 }}>Nenhum produto encontrado</Text>
                        </View>
                    )}

                    <View style={{ marginBottom: 50 }} />
                </View>
            </ScrollView>
        </View>
    );
}