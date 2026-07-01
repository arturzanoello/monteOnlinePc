import { View, Text, ScrollView, ActivityIndicator, Alert, SafeAreaView, Pressable } from "react-native";
import { styles } from "./styles";
import { AddBuild } from "../../components/addBuild";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { getBuilds, PcBuild, deleteBuild } from "../../utils/storage";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export function Build({ navigation }: any) {
    const [builds, setBuilds] = useState<PcBuild[]>([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    const [expandedCategories, setExpandedCategories] = useState({
        Gamer: true,
        Escritório: true,
        Design: true,
        Outros: true
    });

    const toggleCategory = (cat: string) => {
        setExpandedCategories(prev => ({...prev, [cat as keyof typeof prev]: !prev[cat as keyof typeof prev]}));
    };

    const loadBuilds = async () => {
        try {
            setLoading(true);
            const savedBuilds = await getBuilds();
            setBuilds(savedBuilds);
        } catch (error) {
            console.error("Erro ao carregar montagens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            loadBuilds();
        }
    }, [isFocused]);

    const formatPrice = (price: number): string => {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const handleDelete = async (buildId: number | string, buildNumber: number) => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja excluir a Montagem ${buildNumber}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const success = await deleteBuild(buildId);
                            if (success) {
                                Alert.alert("Sucesso", "Montagem excluída com sucesso!");
                                loadBuilds();
                            } else {
                                Alert.alert("Erro", "Não foi possível excluir a montagem");
                            }
                        } catch (error) {
                            console.error("Erro ao excluir montagem:", error);
                            Alert.alert("Erro", "Ocorreu um erro ao excluir a montagem");
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    size={32}
                    color="black"
                    onPress={() => navigation.navigate('Initial')}
                    style={{ position: 'absolute', left: 20, zIndex: 1 }}
                />
                <Text style={styles.title}>Minhas Montagens</Text>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0066cc" />
                </View>
            ) : (
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}
                >
                    {builds.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="hardware-chip-outline" size={64} color="#0066cc" />
                            <Text style={styles.emptyText}>Você ainda não possui nenhuma montagem salva.</Text>
                            <Button
                                label="Criar primeira montagem"
                                onPress={() => navigation.navigate('ChooseCpu')}
                                style={{ width: '100%' }}
                            >
                                Criar primeira montagem
                            </Button>
                        </View>
                    ) : (
                        (() => {
                            const groupedBuilds = {
                                Gamer: builds.filter(b => b.category === 'Gamer'),
                                Escritório: builds.filter(b => b.category === 'Escritório'),
                                Design: builds.filter(b => b.category === 'Design'),
                                Outros: builds.filter(b => !['Gamer', 'Escritório', 'Design'].includes(b.category || ''))
                            };

                            const renderCategory = (categoryName: string, categoryBuilds: PcBuild[], color: string, textColor: string) => {
                                if (categoryBuilds.length === 0) return null;
                                const isExpanded = expandedCategories[categoryName as keyof typeof expandedCategories];
                                return (
                                    <View key={categoryName} style={{ width: '100%', marginBottom: 15 }}>
                                        <Pressable 
                                            onPress={() => toggleCategory(categoryName)}
                                            style={{
                                                flexDirection: 'row', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                backgroundColor: color,
                                                padding: 15,
                                                borderRadius: 10,
                                                marginBottom: 10
                                            }}
                                        >
                                            <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16 }}>
                                                {categoryName}
                                            </Text>
                                            <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color={textColor} />
                                        </Pressable>
                                        {isExpanded && categoryBuilds.map((build) => {
                                            const buildNumber = builds.length - builds.findIndex(b => b.id === build.id);
                                            return (
                                                <AddBuild
                                                    key={build.id}
                                                    id={buildNumber}
                                                    price={formatPrice(build.totalPrice)}
                                                    onPress={() => navigation.navigate('BuildDetails', {
                                                        buildId: build.id,
                                                        buildNumber
                                                    })}
                                                    onDelete={() => handleDelete(build.id, buildNumber)}
                                                />
                                            );
                                        })}
                                    </View>
                                );
                            };

                            return (
                                <View style={{ width: '100%' }}>
                                    {renderCategory('Gamer', groupedBuilds.Gamer, '#F44336', 'white')}
                                    {renderCategory('Escritório', groupedBuilds.Escritório, '#2196F3', 'white')}
                                    {renderCategory('Design', groupedBuilds.Design, '#4CAF50', 'white')}
                                    {renderCategory('Outros', groupedBuilds.Outros, '#9E9E9E', 'white')}
                                </View>
                            );
                        })()
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}