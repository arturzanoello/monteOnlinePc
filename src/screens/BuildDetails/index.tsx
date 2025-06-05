import { View, Text, Pressable, ScrollView, ActivityIndicator, Alert } from "react-native";
import { styles } from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { getBuilds, updateBuild, PcBuild, PcComponent, deleteBuild } from "../../utils/storage";

export function BuildDetails({ navigation, route }: any) {
    const { buildId, buildNumber } = route.params as { buildId: number; buildNumber: number };

    const [build, setBuild] = useState<PcBuild | null>(null);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    const parsePrice = (priceString: string): number => {
        if (!priceString) return 0;
        const cleaned = priceString
            .replace('R$', '')
            .replace(/\s/g, '')
            .replace(/\./g, '')
            .replace(',', '.');
        return parseFloat(cleaned) || 0;
    };

    const formatPrice = (price: number): string => {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const loadBuild = async () => {
        try {
            setLoading(true);
            const savedBuilds = await getBuilds();
            const selectedBuild = savedBuilds.find(b => b.id === buildId);

            if (selectedBuild) {
                setBuild(selectedBuild);

                let total = 0;
                Object.values(selectedBuild.components).forEach(component => {
                    if (component) {
                        total += parsePrice(component.price) * (component.quantity || 1);
                    }
                });
                setTotalPrice(total);
            }
        } catch (error) {
            console.error("Erro ao carregar montagem:", error);
            Alert.alert("Erro", "Não foi possível carregar a montagem");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBuild();
    }, []);

    const updateQuantity = (componentType: string, newQuantity: number) => {
        if (!build) return;
        if (newQuantity < 1 || newQuantity > 9) return;

        // Criar uma cópia profunda do objeto build
        const updatedBuild = JSON.parse(JSON.stringify(build)) as PcBuild;

        // Atualizar a quantidade do componente específico
        const component = updatedBuild.components[componentType];
        if (component) {
            component.quantity = newQuantity;

            // Calcular novo preço total
            let newTotal = 0;
            Object.values(updatedBuild.components).forEach(comp => {
                if (comp) {
                    newTotal += parsePrice(comp.price) * (comp.quantity || 1);
                }
            });

            setBuild(updatedBuild);
            setTotalPrice(newTotal);
        }
    };

    const handleSave = async () => {
        if (!build) return;

        try {
            const updatedBuild = {
                ...build,
                totalPrice
            };

            const success = await updateBuild(updatedBuild);

            if (success) {
                Alert.alert("Sucesso", "Montagem atualizada com sucesso!");
                navigation.goBack();
            } else {
                Alert.alert("Erro", "Não foi possível salvar as alterações");
            }
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            Alert.alert("Erro", "Ocorreu um erro ao salvar as alterações");
        }
    };

    const handleDelete = async () => {
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
                                navigation.goBack();
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

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0066cc" />
            </View>
        );
    }

    if (!build) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Montagem não encontrada</Text>
                <Button
                    label="Voltar"
                    onPress={() => navigation.goBack()}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    size={32}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <Feather name="monitor" size={32} color="black" />
            </View>
            <Text style={styles.textMain}>Editar Montagem</Text>

            <View style={styles.content}>
                <Text style={styles.textContent}>Montagem {buildNumber}</Text>


                {Object.entries(build.components).map(([type, component]) => {
                    if (!component) return null;

                    return (
                        <View key={type} style={styles.itemContent}>
                            <Text style={styles.textItem}>
                                {component.name}
                            </Text>

                            <View style={styles.quantityContainer}>
                                <Pressable
                                    onPress={() => updateQuantity(type, (component.quantity || 1) - 1)}
                                    disabled={(component.quantity || 1) <= 1}
                                >
                                    <AntDesign
                                        name="minuscircleo"
                                        size={20}
                                        color={(component.quantity || 1) <= 1 ? "#ccc" : "black"}
                                    />
                                </Pressable>
                                <Text style={styles.quantityText}>{component.quantity || 1}</Text>
                                <Pressable
                                    onPress={() => updateQuantity(type, (component.quantity || 1) + 1)}
                                    disabled={(component.quantity || 1) >= 9}
                                >
                                    <AntDesign
                                        name="pluscircleo"
                                        size={20}
                                        color={(component.quantity || 1) >= 9 ? "#ccc" : "black"}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    );
                })}


                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>
                        Total: {formatPrice(totalPrice)}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        label="Salvar alterações"
                        onPress={handleSave}
                    />
                </View>
            </View>
            <Text style={styles.textDelete} onPress={handleDelete}>
                Deletar Montagem
            </Text>
        </View>
    );
}