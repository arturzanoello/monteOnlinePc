import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Button } from '../../components/button';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ReviewComponent({ route, navigation }: any) {
    const { componentId, componentName } = route.params as { componentId: string, componentName: string };

    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleSubmit = async () => {
        if (rating === 0) {
            Alert.alert("Atenção", "Por favor, selecione uma nota de 1 a 5 estrelas.");
            return;
        }

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('avaliacoes')
                .insert([
                    {
                        peca: componentId,
                        nota: rating,
                        comentario: comment.trim() || null,
                        usuario: userId // Pode ser null se o usuário for anônimo/deslogado
                    }
                ]);

            if (error) {
                console.error("Erro ao inserir avaliação no Supabase:", error);
                throw error;
            }

            Alert.alert("Sucesso!", "Sua avaliação foi enviada com sucesso.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao enviar a avaliação. Verifique sua conexão ou se a tabela foi criada no banco de dados.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    size={32}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Avaliar Peça</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.componentName}>{componentName}</Text>

                <Text style={styles.label}>Sua nota</Text>
                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Pressable key={star} onPress={() => setRating(star)} style={styles.star}>
                            <Ionicons
                                name={rating >= star ? "star" : "star-outline"}
                                size={40}
                                color="#f59e0b"
                            />
                        </Pressable>
                    ))}
                </View>

                <Text style={styles.label}>Seu comentário (opcional)</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="O que você achou dessa peça? Ela atendeu suas expectativas?"
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    value={comment}
                    onChangeText={setComment}
                    textAlignVertical="top"
                />

                <Button
                    label="Enviar Avaliação"
                    onPress={handleSubmit}
                    style={{ marginTop: 30 }}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        "Enviar Avaliação"
                    )}
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    content: {
        padding: '5%',
    },
    componentName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333'
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#555'
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    star: {
        paddingHorizontal: 5,
    },
    textArea: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        minHeight: 120,
        color: '#333',
    }
});
