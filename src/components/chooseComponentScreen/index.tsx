import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, ScrollView, TextInput, ActivityIndicator, SafeAreaView, Modal, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddComponents } from "../addComponents";
import Feather from "@expo/vector-icons/Feather";
import { validateMotherboardById, validateMemoryById } from '../../utils/hardwareCompatibility';
import { getBuilds } from '../../utils/storage';

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
    onSortChange?: (order: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'none') => void;
    onPriceFilterChange?: (min?: number, max?: number) => void;
    sortMethod?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'none';
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
    sortMethod = 'none',
    hasMore = false,
    isLoadingMore = false,
    searchValue = '',
    minPrice,
    maxPrice
}: ChooseComponentScreenProps) {

    const [currentSort, setCurrentSort] = useState(sortMethod);
    const [localMinPrice, setLocalMinPrice] = useState(minPrice?.toString() || '');
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice?.toString() || '');
    const [modalFiltros, setModalFiltros] = useState(false);

    const handleSortToggle = () => {
        const orderCycle = {
            'none': 'price_desc',
            'price_desc': 'price_asc',
            'price_asc': 'none'
        };
        const nextSort = (orderCycle[currentSort as keyof typeof orderCycle] || 'none') as 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'none';
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

    const validateCompatibility = async (component: any) => {
        try {
            let cpuToTest = null;
            let mbToTest = null;

            const editingBuildId = await AsyncStorage.getItem('@editing_build_id');
            if (editingBuildId) {
                const savedBuilds = await getBuilds();
                const selectedBuild = savedBuilds.find(b => b.id.toString() === editingBuildId);
                if (selectedBuild) {
                    const tempCpu = await AsyncStorage.getItem('@temp_edited_cpu');
                    cpuToTest = tempCpu ? JSON.parse(tempCpu) : selectedBuild.components.cpu;
                    
                    const tempMb = await AsyncStorage.getItem('@temp_edited_motherboard');
                    mbToTest = tempMb ? JSON.parse(tempMb) : selectedBuild.components.motherboard;
                }
            } else {
                const cpuData = await AsyncStorage.getItem('@selected_cpu');
                if (cpuData) cpuToTest = JSON.parse(cpuData);
                
                const mbData = await AsyncStorage.getItem('@selected_motherboard');
                if (mbData) mbToTest = JSON.parse(mbData);
            }

            if (componentType === 'motherboard' && cpuToTest?.id && component.id) {
                const validation = await validateMotherboardById(cpuToTest.id, component.id);
                if (!validation.valid) return validation.error;
            } else if (componentType === 'memory' && mbToTest?.id && component.id) {
                const validation = await validateMemoryById(mbToTest.id, component.id);
                if (!validation.valid) return validation.error;
            } else if (componentType === 'cpu' && mbToTest?.id && component.id) {
                const validation = await validateMotherboardById(component.id, mbToTest.id);
                if (!validation.valid) return validation.error;
            }
        } catch (error) {
            console.error('Erro na validação', error);
        }
        return null;
    };

    const saveSelectedComponent = async (component: any) => {
        try {
            const errorMsg = await validateCompatibility(component);
            if (errorMsg) {
                const { Alert } = require('react-native');
                Alert.alert("Incompatibilidade!", errorMsg);
                return; // Bloqueia o salvamento
            }

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

                // Voltar para a tela de detalhes
                navigation.goBack();
                return; // IMPORTANTE: retornar aqui para não executar o código abaixo
            }

            // Modo normal: salvar para nova montagem
            console.log('[ChooseComponent] Modo normal, salvando para nova montagem');
            await AsyncStorage.setItem(
                `@selected_${componentType}`,
                JSON.stringify(component)
            );
            navigation.push(nextScreen);
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <View style={styles.container}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <View style={styles.header}>
                        <Ionicons
                            name="arrow-back-outline"
                            size={32}
                            color="black"
                            onPress={() => navigation.goBack()}
                            style={{ position: 'absolute', left: 20, zIndex: 1 }}
                        />
                        <Text style={styles.title}>{title}</Text>
                    </View>

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
                            <Pressable onPress={() => setModalFiltros(true)} style={{ marginLeft: searchValue.length > 0 ? 10 : 0 }}>
                                <Ionicons name="filter" size={20} color="#666" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <ScrollView
                    style={{ width: '100%' }}
                    contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
                    onScroll={handleScroll}
                    scrollEventThrottle={100}
                >
                    <View style={{ width: '90%' }}>
                        {componentsData.map((component) => (
                            <AddComponents
                                key={component.id}
                                componentData={component}
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalFiltros}
                onRequestClose={() => setModalFiltros(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                    <View style={{ 
                        backgroundColor: '#FFF', 
                        borderTopLeftRadius: 24, 
                        borderTopRightRadius: 24, 
                        padding: 24,
                        maxHeight: '80%'
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filtros e Ordenação</Text>
                            <Pressable onPress={() => setModalFiltros(false)}>
                                <Ionicons name="close-circle-outline" size={28} color="#666" />
                            </Pressable>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Ordenação */}
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>Ordenar por</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
                                {[
                                    { id: 'price_asc', label: 'Menor Preço' },
                                    { id: 'price_desc', label: 'Maior Preço' },
                                    { id: 'name_asc', label: 'A-Z' },
                                    { id: 'name_desc', label: 'Z-A' },
                                    { id: 'none', label: 'Sem Ordenação' }
                                ].map(option => (
                                    <Pressable
                                        key={option.id}
                                        onPress={() => {
                                            setCurrentSort(option.id as any);
                                            setCurrentSort(option.id as any);
                                        }}
                                        style={{
                                            paddingHorizontal: 16,
                                            paddingVertical: 10,
                                            marginRight: 10,
                                            marginBottom: 10,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: currentSort === option.id ? '#000' : '#DDD',
                                            backgroundColor: currentSort === option.id ? '#000' : '#FFF',
                                        }}
                                    >
                                        <Text style={{
                                            color: currentSort === option.id ? '#FFF' : '#333',
                                            fontWeight: '600'
                                        }}>{option.label}</Text>
                                    </Pressable>
                                ))}
                            </View>

                            {/* Faixa de Preço */}
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>Faixa de Preço (Pix)</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                                <TextInput
                                    style={{ flex: 1, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, padding: 12, marginRight: 10, fontSize: 16 }}
                                    placeholder="Min (R$)"
                                    keyboardType="numeric"
                                    value={localMinPrice}
                                    onChangeText={setLocalMinPrice}
                                />
                                <TextInput
                                    style={{ flex: 1, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, padding: 12, fontSize: 16 }}
                                    placeholder="Max (R$)"
                                    keyboardType="numeric"
                                    value={localMaxPrice}
                                    onChangeText={setLocalMaxPrice}
                                />
                            </View>
                        </ScrollView>
                        
                        <TouchableOpacity 
                            style={{ backgroundColor: '#000', padding: 15, borderRadius: 12, alignItems: 'center' }}
                            onPress={() => {
                                if (onSortChange) onSortChange(currentSort);
                                applyPriceFilter();
                                setModalFiltros(false);
                            }}
                        >
                            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Aplicar Filtros</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}