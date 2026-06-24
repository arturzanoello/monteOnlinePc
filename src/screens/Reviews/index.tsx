import React, { useState, useEffect, useMemo } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, Switch, TextInput, Pressable, Modal, TouchableOpacity } from "react-native";
import { Button } from "../../components/button";
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../../utils/supabase';

interface Review {
    id: number;
    nota: number;
    comentario: string;
    pecas: {
        nome_produto: string;
    };
}

export function Reviews({ navigation }: any) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    // Filtros e busca
    const [searchQuery, setSearchQuery] = useState('');
    const [modalFiltros, setModalFiltros] = useState(false);
    const [sortMethod, setSortMethod] = useState<'recentes' | 'maior_nota' | 'menor_nota'>('recentes');
    const [showOnlyUser, setShowOnlyUser] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                setUserId(data.user.id);
            }
        };
        fetchUser();
    }, []);

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            let query = supabase
                .from('reviews')
                .select(`
                    id,
                    nota,
                    comentario,
                    "usuarioID",
                    pecas (nome_produto)
                `)
                .order('id', { ascending: false });

            // Busca tudo e filtra no front
            const { data, error } = await query;

            if (error) throw error;
            
            if (data) {
                const formatted = data.map(item => ({
                    id: item.id,
                    nota: item.nota,
                    comentario: item.comentario,
                    usuarioID: item.usuarioID,
                    pecas: Array.isArray(item.pecas) ? item.pecas[0] : (item.pecas || { nome_produto: 'Peça Desconhecida' })
                }));
                setReviews(formatted as any);
            }
        } catch (error) {
            console.error("Erro ao buscar avaliações:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchReviews();
        });
        return unsubscribe;
    }, [navigation]);

    const filteredReviews = useMemo(() => {
        let result = reviews;

        // Busca por nome da peça
        if (searchQuery.trim() !== '') {
            result = result.filter(r => 
                r.pecas?.nome_produto?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.comentario?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filtro de usuário
        if (showOnlyUser && userId) {
            result = result.filter((r: any) => r.usuarioID === userId);
        }

        // Ordenação
        result = [...result].sort((a, b) => {
            if (sortMethod === 'maior_nota') return b.nota - a.nota;
            if (sortMethod === 'menor_nota') return a.nota - b.nota;
            // 'recentes' (id maior)
            return b.id - a.id;
        });

        return result;
    }, [reviews, searchQuery, showOnlyUser, sortMethod, userId]);

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
                <Text style={styles.title}>Avaliações</Text>
            </View>

            <View style={{ paddingHorizontal: '5%' }}>
                <View style={{
                    backgroundColor: '#f5f5f5', borderRadius: 12, flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 15, borderWidth: 1, borderColor: '#e0e0e0', marginBottom: 15
                }}>
                    <Ionicons name="search" size={20} color="#666" />
                    <TextInput
                        style={{ flex: 1, padding: 12, fontSize: 16, color: '#333' }}
                        placeholder="Buscar por peça ou comentário..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#666" />
                        </Pressable>
                    )}
                    <Pressable onPress={() => setModalFiltros(true)}>
                        <Ionicons name="filter" size={20} color="#666" />
                    </Pressable>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
                ) : filteredReviews.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="star-half-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>
                            {showOnlyUser ? "Você ainda não enviou nenhuma avaliação." : "Nenhuma avaliação encontrada."}
                        </Text>
                        <Text style={styles.emptySubtext}>Ajude a comunidade avaliando as peças que você já utilizou!</Text>
                    </View>
                ) : (
                    filteredReviews.map(review => (
                        <View key={review.id} style={styles.reviewCard}>
                            <Text style={styles.pieceName}>{review.pecas?.nome_produto || "Peça"}</Text>
                            <View style={styles.starsRow}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Ionicons 
                                        key={star} 
                                        name={review.nota >= star ? "star" : "star-outline"} 
                                        size={20} 
                                        color="#f59e0b" 
                                    />
                                ))}
                            </View>
                            {review.comentario && review.comentario.trim() !== '' && (
                                <Text style={styles.comment}>{review.comentario}</Text>
                            )}
                        </View>
                    ))
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
                                    { id: 'recentes', label: 'Mais Recentes' },
                                    { id: 'maior_nota', label: 'Maior Nota' },
                                    { id: 'menor_nota', label: 'Menor Nota' }
                                ].map(option => (
                                    <Pressable
                                        key={option.id}
                                        onPress={() => setSortMethod(option.id as any)}
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

                            {/* Filtros Específicos */}
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>Filtros</Text>
                            <View style={styles.filterContainer}>
                                <Text style={styles.filterText}>Apenas minhas avaliações</Text>
                                <Switch 
                                    value={showOnlyUser} 
                                    onValueChange={setShowOnlyUser}
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={showOnlyUser ? "#2196F3" : "#f4f3f4"}
                                />
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            style={{ backgroundColor: '#000', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 }}
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

const styles = StyleSheet.create({
    container: { alignItems: 'center', paddingBottom: 40, paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, backgroundColor: '#FAFAFA', position: 'relative' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', marginBottom: 15 },
    filterText: { fontSize: 16, fontWeight: '500', color: '#333' },
    emptyState: { width: '100%', alignItems: 'center', marginTop: 50, padding: 20 },
    emptyText: { fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', color: '#333' },
    emptySubtext: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 10, lineHeight: 20 },
    reviewCard: { width: '100%', backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
    pieceName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    starsRow: { flexDirection: 'row', marginBottom: 10 },
    comment: { fontSize: 14, color: '#555', fontStyle: 'italic', backgroundColor: '#F9F9F9', padding: 10, borderRadius: 8, marginTop: 5 }
});
