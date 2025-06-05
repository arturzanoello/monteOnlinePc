import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { styles } from "./styles";
import { AddBuild } from "../../components/addBuild";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { getBuilds, PcBuild, deleteBuild } from "../../utils/storage";
import { useIsFocused } from "@react-navigation/native";

export function Build({ navigation }: any) {
    const [builds, setBuilds] = useState<PcBuild[]>([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    const loadBuilds = async () => {
        try {
            setLoading(true);
            const savedBuilds = await getBuilds();
            const sortedBuilds = [...savedBuilds].sort((a, b) => b.id - a.id);
            setBuilds(sortedBuilds);
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

    const handleDelete = async (buildId: number, buildNumber: number) => {
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
        <View style={styles.container}>
            <Text style={styles.textMain}>Minhas Montagens</Text>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0066cc" />
                </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {builds.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Nenhuma montagem salva</Text>
                            <Button
                                label="Criar primeira montagem"
                                onPress={() => navigation.navigate('ChooseCpu')}
                            />
                        </View>
                    ) : (
                        builds.map((build, index) => {
                            const buildNumber = builds.length - index;
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
                        })
                    )}
                </ScrollView>
            )}

            <View style={styles.footer}>
                <Button
                    label="Voltar"
                    onPress={() => navigation.navigate('Initial')}
                />
            </View>
        </View>
    );
}