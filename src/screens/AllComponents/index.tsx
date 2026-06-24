import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Pressable, TextInput, Modal, TouchableOpacity } from "react-native";
import { AddComponents } from "../../components/addComponents";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentSearchTerms } from "../../utils/componentHelper";
import { useComponentPagination } from "../../hooks/useComponentPagination";

const categories = [
    { id: 'CPU', label: 'Processador', search: ComponentSearchTerms.CPU },
    { id: 'MOTHERBOARD', label: 'Placa-mãe', search: ComponentSearchTerms.MOTHERBOARD },
    { id: 'MEMORY', label: 'Memória RAM', search: ComponentSearchTerms.MEMORY },
    { id: 'GPU', label: 'Placa de Vídeo', search: ComponentSearchTerms.GPU },
    { id: 'STORAGE', label: 'Armazenamento', search: ComponentSearchTerms.STORAGE },
    { id: 'PSU', label: 'Fonte', search: ComponentSearchTerms.PSU },
    { id: 'CASE', label: 'Gabinete', search: ComponentSearchTerms.CASE },
];

export function AllComponents({ navigation }: any) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [modalFiltros, setModalFiltros] = useState(false);

    const {
        data, loading, loadingMore, error, hasMore, searchQuery,
        handleLoadMore, handleSearch, sortMethod, handleSortChange
    } = useComponentPagination(selectedCategory.search);

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 300;

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            if (hasMore && !loadingMore && handleLoadMore) {
                handleLoadMore();
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <View style={{ paddingHorizontal: '5%', paddingTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Ionicons name="arrow-back-outline" size={32} color="black" onPress={() => navigation.goBack()} />
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>Todas as Peças</Text>
                </View>

                {/* Busca */}
                <View style={{
                    backgroundColor: '#f5f5f5', borderRadius: 12, flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 15, borderWidth: 1, borderColor: '#e0e0e0', marginBottom: 15
                }}>
                    <Ionicons name="search" size={20} color="#666" />
                    <TextInput
                        style={{ flex: 1, padding: 12, fontSize: 16, color: '#333' }}
                        placeholder={`Buscar ${selectedCategory.label.toLowerCase()}...`}
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => handleSearch('')}>
                            <Ionicons name="close-circle" size={20} color="#666" />
                        </Pressable>
                    )}
                    <Pressable onPress={() => setModalFiltros(true)}>
                        <Ionicons name="filter" size={20} color="#666" />
                    </Pressable>
                </View>
            </View>

            {/* Lista de Componentes */}
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
                onScroll={handleScroll}
                scrollEventThrottle={100}
            >
                {loading ? (
                    <View style={{ marginTop: 50 }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={{ marginTop: 10 }}>Carregando {selectedCategory.label}...</Text>
                    </View>
                ) : error ? (
                    <Text style={{ color: 'red', marginTop: 50, paddingHorizontal: 20, textAlign: 'center' }}>{error}</Text>
                ) : data.length === 0 ? (
                    <Text style={{ marginTop: 50, color: '#666' }}>Nenhuma peça encontrada.</Text>
                ) : (
                    <View style={{ width: '90%' }}>
                        {data.map((component) => (
                            <Pressable
                                key={component.id}
                                onPress={() => navigation.navigate('ComponentDetails', { componentData: component })}
                            >
                                <AddComponents
                                    componentData={component}
                                    hideSelectButton={true} // Esconde o botão selecionar
                                />
                            </Pressable>
                        ))}
                    </View>
                )}

                {loadingMore && (
                    <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                        <ActivityIndicator size="small" color="#0000ff" />
                        <Text style={{ marginTop: 10, color: '#666' }}>Carregando mais...</Text>
                    </View>
                )}
            </ScrollView>

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
                                        onPress={() => handleSortChange(option.id as any)}
                                        style={{
                                            paddingHorizontal: 16,
                                            paddingVertical: 10,
                                            marginRight: 10,
                                            marginBottom: 10,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: sortMethod === option.id ? '#000' : '#DDD',
                                            backgroundColor: sortMethod === option.id ? '#000' : '#FFF',
                                        }}
                                    >
                                        <Text style={{
                                            color: sortMethod === option.id ? '#FFF' : '#333',
                                            fontWeight: '600'
                                        }}>{option.label}</Text>
                                    </Pressable>
                                ))}
                            </View>

                            {/* Categorias */}
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>Categoria</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
                                {categories.map(cat => (
                                    <Pressable
                                        key={cat.id}
                                        onPress={() => setSelectedCategory(cat)}
                                        style={{
                                            paddingHorizontal: 16,
                                            paddingVertical: 10,
                                            marginRight: 10,
                                            marginBottom: 10,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: selectedCategory.id === cat.id ? '#2196F3' : '#DDD',
                                            backgroundColor: selectedCategory.id === cat.id ? '#2196F3' : '#FFF',
                                        }}
                                    >
                                        <Text style={{
                                            color: selectedCategory.id === cat.id ? '#FFF' : '#333',
                                            fontWeight: '600'
                                        }}>{cat.label}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>
                        
                        <TouchableOpacity 
                            style={{ backgroundColor: '#000', padding: 15, borderRadius: 12, alignItems: 'center' }}
                            onPress={() => setModalFiltros(false)}
                        >
                            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Aplicar Filtros</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
