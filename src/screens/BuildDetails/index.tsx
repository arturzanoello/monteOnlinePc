import { View, Text, Pressable, ScrollView, ActivityIndicator, Alert } from "react-native";
import { styles } from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { getBuilds, PcBuild, deleteBuild } from "../../utils/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function BuildDetails({ navigation, route }: any) {
    const { buildId, buildNumber } = route.params as { buildId: number | string; buildNumber: number };

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
            const selectedBuild = savedBuilds.find(b => b.id.toString() === buildId.toString());

            if (selectedBuild) {
                setBuild(selectedBuild);
                // Usa o total que já vem calculado do banco de dados
                setTotalPrice(selectedBuild.totalPrice);
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
        
        // Listener para recarregar quando voltar de uma tela de edição
        const unsubscribe = navigation.addListener('focus', () => {
            loadBuild();
        });

        return unsubscribe;
    }, [navigation]);

    const getComponentTypeName = (type: string): string => {
        const names: { [key: string]: string } = {
            cpu: 'Processador',
            motherboard: 'Placa-Mãe',
            memory: 'Memória RAM',
            gpu: 'Placa de Vídeo',
            storage: 'Armazenamento',
            psu: 'Fonte',
            case: 'Gabinete',
        };
        return names[type] || type;
    };

    const getNextScreen = (type: string): string => {
        const screens: { [key: string]: string } = {
            cpu: 'ChooseCpu',
            motherboard: 'ChooseMotherboard',
            memory: 'ChooseMemory',
            gpu: 'ChooseGpu',
            storage: 'ChooseStorage',
            psu: 'ChoosePsu',
            case: 'ChooseCase',
        };
        return screens[type] || 'ChooseCpu';
    };

    const handleEditComponent = async (componentType: string) => {
        if (!build) return;

        try {
            // Salvar a montagem atual temporariamente
            await AsyncStorage.setItem('@editing_build_id', buildId.toString());
            await AsyncStorage.setItem('@editing_build_number', buildNumber.toString());
            await AsyncStorage.setItem('@editing_component_type', componentType);
            
            // Navegar para a tela de seleção do componente
            const screenName = getNextScreen(componentType);
            navigation.navigate(screenName, undefined, { pop: true });
        } catch (error) {
            console.error("Erro ao preparar edição:", error);
            Alert.alert("Erro", "Não foi possível iniciar a edição");
        }
    };

    const handleBack = async () => {
        try {
            // Limpar flags de edição ao sair
            await AsyncStorage.removeItem('@editing_build_id');
            await AsyncStorage.removeItem('@editing_build_number');
            await AsyncStorage.removeItem('@editing_component_type');
            
            // Navegar para Build
            navigation.navigate('Build', undefined, { pop: true });
        } catch (error) {
            console.error("Erro ao voltar:", error);
            navigation.navigate('Build', undefined, { pop: true });
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
                                await handleBack();
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
                <Button label="Voltar"
                    onPress={() => navigation.navigate('Build', undefined, { pop: true })}>
                    Voltar
                </Button>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '90%' }}>
                <View style={styles.header}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={32}
                        color="black"
                        onPress={handleBack}
                    />
                    <Feather name="monitor" size={32} color="black" />
                </View>
                <Text style={styles.textMain}>Detalhes da Montagem</Text>

                <View style={styles.content}>
                    <Text style={styles.textContent}>Montagem {buildNumber}</Text>

                    {Object.entries(build.components).map(([type, component]) => {
                        if (!component) return null;

                        return (
                            <View key={type} style={styles.itemContent}>
                                <View style={styles.componentInfo}>
                                    <Text style={styles.componentType}>
                                        {getComponentTypeName(type)}
                                    </Text>
                                    <Text style={styles.componentName} numberOfLines={2}>
                                        {component.name}
                                    </Text>
                                    <Text style={styles.componentPrice}>
                                        {component.price}
                                    </Text>
                                </View>

                                <Pressable 
                                    style={styles.editButton}
                                    onPress={() => handleEditComponent(type)}
                                >
                                    <Ionicons name="create-outline" size={24} color="#2e7d32" />
                                </Pressable>
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
                            onPress={() => navigation.navigate('Build', undefined, { pop: true })}
                        >
                            Salvar alterações
                        </Button>
                    </View>
                </View>
                <Text style={styles.textDelete} onPress={handleDelete}>
                    Deletar Montagem
                </Text>
            </ScrollView>
        </View>
    );
}