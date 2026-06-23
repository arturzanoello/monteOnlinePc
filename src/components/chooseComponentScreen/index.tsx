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
    onSortChange?: (order: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc') => void;
    onPriceFilterChange?: (min?: number, max?: number) => void;
    sortMethod?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
    hasMore?: boolean;
    isLoadingMore?: boolean;
    searchValue?: string;
    minPrice?: number;
    maxPrice?: number;
}

export function ChooseComponentScreen({
    navigation,
    componentType,
    title,
    nextScreen,
    componentsData,
    onLoadMore,
    onSearch,
    onSortChange,
    onPriceFilterChange,
    sortMethod = 'price_desc',
    hasMore = false,
    isLoadingMore = false,
    searchValue = '',
    minPrice,
    maxPrice
}: ChooseComponentScreenProps) {

    const [currentSort, setCurrentSort] = useState(sortMethod);
    const [localMinPrice, setLocalMinPrice] = useState(minPrice?.toString() || '');
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice?.toString() || '');

    const handleSortToggle = () => {
        const orderCycle = {
            'price_desc': 'price_asc',
            'price_asc': 'name_asc',
            'name_asc': 'name_desc',
            'name_desc': 'price_desc'
        };
        const nextSort = orderCycle[currentSort] as 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
        setCurrentSort(nextSort);
        if (onSortChange) {
            onSortChange(nextSort);
        }
    };

    const applyPriceFilter = () => {
        if (onPriceFilterChange) {
            onPriceFilterChange(
                localMinPrice ? parseFloat(localMinPrice) : undefined,
                localMaxPrice ? parseFloat(localMaxPrice) : undefined
            );
        }
    };

    const saveSelectedComponent = async (component: any) => {
        try {
            console.log('[ChooseComponent] Salvando componente:', {
                name: component.name,
                price: component.price,
                priceType: typeof component.price
            });
            
            // Verificar se está em modo de edição
            const editingBuildId = await AsyncStorage.getItem('@editing_build_id');
            const editingBuildNumber = await AsyncStorage.getItem('@editing_build_number');
            const editingComponentType = await AsyncStorage.getItem('@editing_component_type');
            
            console.log('[ChooseComponent] Modo de edição:', {
                editingBuildId,
                editingBuildNumber,
                editingComponentType,
                currentComponentType: componentType,
                isEditing: editingBuildId && editingComponentType === componentType
            });
            
            if (editingBuildId && editingBuildNumber && editingComponentType === componentType) {
                // Modo de edição: salvar temporariamente sem persistir no banco
                console.log('[ChooseComponent] Salvando componente temporariamente para edição');
                
                // Salvar o componente selecionado temporariamente
                await AsyncStorage.setItem(
                    `@temp_edited_${componentType}`,
                    JSON.stringify(component)
                );
                
                console.log('[ChooseComponent] Navegando de volta para BuildDetails');
                
                // Voltar para a tela de detalhes com os parâmetros corretos
                navigation.navigate('BuildDetails', {
                    buildId: editingBuildId,
                    buildNumber: parseInt(editingBuildNumber)
                });
                return; // IMPORTANTE: retornar aqui para não executar o código abaixo
            }
            
            // Modo normal: salvar para nova montagem
            console.log('[ChooseComponent] Modo normal, salvando para nova montagem');
            await AsyncStorage.setItem(
                `@selected_${componentType}`,
                JSON.stringify(component)
            );
            navigation.navigate(nextScreen, undefined, 
                { pop: true}
            );
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
        // Chama o callback imediatamente para atualizar o valor visual
        if (onSearch) {
            onSearch(text);
        }
    };

    // Sincroniza currentSort com sortMethod externo
    useEffect(() => {
        if (sortMethod) {
            setCurrentSort(sortMethod);
        }
    }, [sortMethod]);

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
                                value={searchValue}
                                onChangeText={handleSearch}
                            />
                            {searchValue.length > 0 && (
                                <Pressable onPress={() => handleSearch('')}>
                                    <Ionicons name="close-circle" size={20} color="#666" />
                                </Pressable>
                            )}
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                        <View style={{ flexDirection: 'row', flex: 1, marginRight: 10 }}>
                            <TextInput
                                style={{ flex: 1, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 8, marginRight: 5 }}
                                placeholder="Min (R$)"
                                keyboardType="numeric"
                                value={localMinPrice}
                                onChangeText={setLocalMinPrice}
                                onBlur={applyPriceFilter}
                            />
                            <TextInput
                                style={{ flex: 1, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 8 }}
                                placeholder="Max (R$)"
                                keyboardType="numeric"
                                value={localMaxPrice}
                                onChangeText={setLocalMaxPrice}
                                onBlur={applyPriceFilter}
                            />
                        </View>

                        <Pressable
                            style={styles.priceButton}
                            onPress={handleSortToggle}
                        >
                            {currentSort === 'price_desc' && (
                                <>
                                    <Text style={styles.priceButtonText}>Maior Preço</Text>
                                    <Ionicons name="arrow-up" size={20} color="black" />
                                </>
                            )}
                            {currentSort === 'price_asc' && (
                                <>
                                    <Text style={styles.priceButtonText}>Menor Preço</Text>
                                    <Ionicons name="arrow-down" size={20} color="black" />
                                </>
                            )}
                            {currentSort === 'name_asc' && (
                                <>
                                    <Text style={styles.priceButtonText}>Nome (A-Z)</Text>
                                    <Ionicons name="text-outline" size={20} color="black" />
                                </>
                            )}
                            {currentSort === 'name_desc' && (
                                <>
                                    <Text style={styles.priceButtonText}>Nome (Z-A)</Text>
                                    <Ionicons name="text-outline" size={20} color="black" />
                                </>
                            )}
                        </Pressable>
                    </View>

                    {componentsData.map((component) => (
                        <AddComponents
                            key={component.id}
                            product={component.name}
                            price={component.price}
                            description={component.description}
                            shop={component.shop}
                            onPress={() => saveSelectedComponent(component)}
                        />
                    ))}

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