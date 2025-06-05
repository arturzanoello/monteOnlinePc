import { View, Text, ScrollView } from "react-native";
import { getNextBuildId, saveBuild } from "../../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { Button } from "../../components/button";

export function SaveBuild({ navigation }: any) {
    const [components, setComponents] = useState<any>({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [nextBuildId, setNextBuildId] = useState(1);

    const parsePrice = (priceString: string): number => {
        if (!priceString) return 0;

        // Remove espaços e converte formato brasileiro
        const cleaned = priceString
            .replace('R$', '')
            .replace(/\s/g, '')
            .replace(/\./g, '')
            .replace(',', '.');

        return parseFloat(cleaned) || 0;
    };

    // Função para formatar o preço no formato brasileiro
    const formatPrice = (price: number): string => {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const componentTranslations: Record<string, string> = {
        cpu: "Processador",
        motherboard: "Placa Mãe",
        gpu: "Placa de Vídeo",
        memory: "Memória RAM",
        storage: "Armazenamento",
        psu: "Fonte",
        case: "Gabinete"
    };

    useEffect(() => {
        const loadComponents = async () => {
            try {
                const keys = [
                    '@selected_cpu',
                    '@selected_motherboard',
                    '@selected_gpu',
                    '@selected_memory',
                    '@selected_storage',
                    '@selected_psu',
                    '@selected_case'
                ];

                const values = await AsyncStorage.multiGet(keys);

                const loadedComponents: any = {};
                let total = 0;

                values.forEach(([key, value]) => {
                    if (value) {
                        const component = JSON.parse(value);
                        loadedComponents[key.replace('@selected_', '')] = component;
                        total += parsePrice(component.price);
                    }
                });

                setComponents(loadedComponents);
                setTotalPrice(total);

                const id = await getNextBuildId();
                setNextBuildId(id)
            } catch (error) {
                console.error("Erro ao carregar componentes:", error);
            }
        };

        loadComponents();
    }, []);

    const handleSaveBuild = async () => {
        const newBuild = {
            id: nextBuildId,
            components,
            totalPrice
        };

        await saveBuild(newBuild);

        await AsyncStorage.multiRemove([
            '@selected_cpu',
            '@selected_motherboard',
            '@selected_gpu',
            '@selected_memory',
            '@selected_storage',
            '@selected_psu',
            '@selected_case'
        ]);

        navigation.navigate('Build');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textMain}>Resumo da Montagem</Text>

            <ScrollView style={styles.scrollView}>
                {Object.entries(components).map(([key, value]: [string, any]) => (
                    value && (
                        <View key={key} style={styles.componentItem}>
                            <Text style={styles.componentType}>
                                {componentTranslations[key] || key.toUpperCase()}
                            </Text>
                            <Text style={styles.componentName}>{value.name}</Text>
                            <Text style={styles.priceText}>R${value.price}</Text>
                        </View>
                    )
                ))}

                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>
                        Total: {formatPrice(totalPrice)}
                    </Text>
                </View>
            </ScrollView>

            <Button
                label="Salvar Montagem"
                onPress={handleSaveBuild}
            />
        </View>
    );
}