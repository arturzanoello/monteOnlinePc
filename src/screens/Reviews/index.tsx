import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, Switch } from "react-native";
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
    const [showOnlyUser, setShowOnlyUser] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

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
                    pecas (nome_produto)
                `)
                .order('id', { ascending: false });

            if (showOnlyUser && userId) {
                query = query.eq('usuarioID', userId);
            }

            const { data, error } = await query;

            if (error) throw error;
            
            // Format data
            if (data) {
                const formatted = data.map(item => ({
                    id: item.id,
                    nota: item.nota,
                    comentario: item.comentario,
                    // Verifica se o array vem vazio caso a FK não ache ou se vem objeto direto
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

    // Recarrega sempre que o filtro ou userId mudar
    useEffect(() => {
        fetchReviews();
    }, [showOnlyUser, userId]);

    // Recarrega também sempre que a tela ganha foco (caso o usuário tenha acabado de fazer uma review)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchReviews();
        });
        return unsubscribe;
    }, [navigation, showOnlyUser, userId]);

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

            <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Minhas avaliações</Text>
                <Switch 
                    value={showOnlyUser} 
                    onValueChange={setShowOnlyUser}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={showOnlyUser ? "#2196F3" : "#f4f3f4"}
                />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
                ) : reviews.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="star-half-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>
                            {showOnlyUser ? "Você ainda não enviou nenhuma avaliação." : "Nenhuma avaliação encontrada."}
                        </Text>
                        <Text style={styles.emptySubtext}>Ajude a comunidade avaliando as peças que você já utilizou!</Text>
                    </View>
                ) : (
                    reviews.map(review => (
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', paddingBottom: 40, paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, backgroundColor: '#FAFAFA', position: 'relative' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', marginBottom: 15 },
    filterText: { fontSize: 16, fontWeight: '500', color: '#333' },
    emptyState: { width: '100%', alignItems: 'center', marginTop: 50, padding: 20 },
    emptyText: { fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', color: '#333' },
    emptySubtext: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 10, lineHeight: 20 },
    reviewCard: { width: '100%', backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
    pieceName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    starsRow: { flexDirection: 'row', marginBottom: 10 },
    comment: { fontSize: 14, color: '#555', fontStyle: 'italic', backgroundColor: '#F9F9F9', padding: 10, borderRadius: 8, marginTop: 5 }
});
