import { View, Text, Pressable, ScrollView, ActivityIndicator, Alert, SafeAreaView } from "react-native";
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
    const [editedCategory, setEditedCategory] = useState<'Gamer' | 'Escritório' | 'Design'>('Gamer');

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
                // Criar cópia para permitir edições temporárias
                const buildCopy = JSON.parse(JSON.stringify(selectedBuild));

                // Carregar componentes editados temporariamente
                const componentTypes = ['cpu', 'motherboard', 'memory', 'gpu', 'storage', 'psu', 'case'];
                for (const type of componentTypes) {
                    const tempComponent = await AsyncStorage.getItem(`@temp_edited_${type}`);
                    if (tempComponent) {
                        const component = JSON.parse(tempComponent);
                        buildCopy.components[type] = {
                            id: component.id,
                            name: component.name,
                            price: component.price,
                            quantity: buildCopy.components[type]?.quantity || 1
                        };
                    }
                }

                // Recalcular total com componentes editados
                let newTotal = 0;
                Object.values(buildCopy.components).forEach((comp: any) => {
                    if (comp) {
                        newTotal += parsePrice(comp.price) * (comp.quantity || 1);
                    }
                });

                setBuild(buildCopy);
                setTotalPrice(newTotal);
                if (buildCopy.category) {
                    setEditedCategory(buildCopy.category as any);
                }
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
            await AsyncStorage.setItem('@editing_build_id', buildId.toString());
            await AsyncStorage.setItem('@editing_build_number', buildNumber.toString());
            await AsyncStorage.setItem('@editing_component_type', componentType);
            const screenName = getNextScreen(componentType);
            navigation.push(screenName);
        } catch (error) {
            console.error("Erro ao preparar edição:", error);
            Alert.alert("Erro", "Não foi possível iniciar a edição");
        }
    };

    const handleSaveChanges = async () => {
        if (!build) return;

        try {
            const updatedBuild = {
                ...build,
                category: editedCategory
            };

            // Atualizar build no banco de dados
            const { updateBuild } = await import('../../utils/storage');
            const success = await updateBuild(updatedBuild);

            if (success) {
                // Limpar componentes temporários
                const componentTypes = ['cpu', 'motherboard', 'memory', 'gpu', 'storage', 'psu', 'case'];
                for (const type of componentTypes) {
                    await AsyncStorage.removeItem(`@temp_edited_${type}`);
                }

                // Limpar flags de edição
                await AsyncStorage.removeItem('@editing_build_id');
                await AsyncStorage.removeItem('@editing_build_number');
                await AsyncStorage.removeItem('@editing_component_type');

                Alert.alert("Sucesso", "Alterações salvas com sucesso!");
                navigation.goBack();
            } else {
                Alert.alert("Erro", "Não foi possível salvar as alterações");
            }
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            Alert.alert("Erro", "Ocorreu um erro ao salvar as alterações");
        }
    };

    const handleBack = async () => {
        try {
            // Limpar componentes temporários
            const componentTypes = ['cpu', 'motherboard', 'memory', 'gpu', 'storage', 'psu', 'case'];
            for (const type of componentTypes) {
                await AsyncStorage.removeItem(`@temp_edited_${type}`);
            }

            await AsyncStorage.removeItem('@editing_build_id');
            await AsyncStorage.removeItem('@editing_build_number');
            await AsyncStorage.removeItem('@editing_component_type');

            // Voltar para Build
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao voltar:", error);
            navigation.goBack();
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
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0066cc" />
            </SafeAreaView>
        );
    }

    if (!build) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Montagem não encontrada</Text>
                <Button label="Voltar"
                    onPress={() => navigation.navigate('Build')}>
                    Voltar
                </Button>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: '5%' }}
            >
                <View style={{ width: '100%', maxWidth: 600 }}>
                    <View style={styles.header}>
                        <Ionicons
                            name="arrow-back-outline"
                            size={32}
                            color="black"
                            onPress={handleBack}
                            style={{ position: 'absolute', left: 20, zIndex: 1 }}
                        />
                        <Text style={styles.title}>Detalhes da Montagem</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.textContent}>Montagem {buildNumber}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                            {[
                                { cat: 'Gamer', activeBg: '#F44336', activeText: 'white' },
                                { cat: 'Escritório', activeBg: '#2196F3', activeText: 'white' },
                                { cat: 'Design', activeBg: '#4CAF50', activeText: 'white' }
                            ].map(({ cat, activeBg, activeText }) => (
                                <Text 
                                    key={cat} 
                                    style={{
                                        marginHorizontal: 10,
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 8,
                                        backgroundColor: editedCategory === cat ? activeBg : '#f5f5f5',
                                        color: editedCategory === cat ? activeText : '#666',
                                        fontWeight: 'bold',
                                        borderWidth: 1,
                                        borderColor: editedCategory === cat ? activeBg : '#ddd'
                                    }}
                                    onPress={() => setEditedCategory(cat as any)}
                                >
                                    {cat}
                                </Text>
                            ))}
                        </View>

                        {Object.entries(build.components).map(([type, component]) => {
                            if (!component) return null;

                            return (
                                <View key={type} style={styles.itemContent}>
                                    <Pressable
                                        style={styles.editButton}
                                        onPress={() => navigation.navigate('ReviewComponent', { 
                                            componentId: component.id, 
                                            componentName: component.name 
                                        })}
                                    >
                                        <Ionicons name="star-outline" size={24} color="#f59e0b" />
                                    </Pressable>
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
                                onPress={handleSaveChanges}
                            >
                                Salvar alterações
                            </Button>
                        </View>
                    </View>
                    <Text style={styles.textDelete} onPress={handleDelete}>
                        Deletar Montagem
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}