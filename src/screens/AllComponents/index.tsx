import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Pressable, TextInput } from "react-native";
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

    const { 
        data, loading, loadingMore, error, hasMore, searchQuery, 
        handleLoadMore, handleSearch 
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

                {/* Categorias */}
                <View style={{ height: 50, marginBottom: 15 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categories.map((cat) => (
                            <Pressable
                                key={cat.id}
                                onPress={() => setSelectedCategory(cat)}
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 10,
                                    marginRight: 10,
                                    borderRadius: 20,
                                    backgroundColor: selectedCategory.id === cat.id ? '#000' : '#E0E0E0',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{ 
                                    color: selectedCategory.id === cat.id ? '#FFF' : '#333',
                                    fontWeight: 'bold' 
                                }}>
                                    {cat.label}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
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
        </SafeAreaView>
    );
}
