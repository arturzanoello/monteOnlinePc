import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { styles } from "./styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddComponents } from "../addComponents";
import Feather from "@expo/vector-icons/Feather";

type ComponentType = 'cpu' | 'motherboard' | 'memory' | 'gpu' | 'storage' | 'psu' | 'case';

interface ChooseComponentScreenProps {
    navigation: any;
    componentType: ComponentType;
    title: string;
    nextScreen: string;
    componentsData: {
        id: string;
        name: string;
        price: string;
        description: string;
        shop: string;
    }[];
}

export function ChooseComponentScreen({
    navigation,
    componentType,
    title,
    nextScreen,
    componentsData
}: ChooseComponentScreenProps) {

    const [priceExpensive, setPriceExpensive] = useState(true);

    const parsePrice = (priceString: string): number => {
        if (!priceString) return 0;
        const cleaned = priceString
            .replace('R$', '')
            .replace(/\s/g, '')
            .replace(/\./g, '')
            .replace(',', '.');
        return parseFloat(cleaned) || 0;
    };

    const saveSelectedComponent = async (component: any) => {
        try {
            await AsyncStorage.setItem(
                `@selected_${componentType}`,
                JSON.stringify(component)
            );
            navigation.navigate(nextScreen);
        } catch (e) {
            console.error(`Erro ao salvar ${componentType}:`, e);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '90%' }}>
                <View style={styles.header}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={32}
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                    <Feather name="monitor" size={32} color="black" />
                </View>

                <Text style={styles.textMain}>{title}</Text>

                <View style={{ alignItems: 'flex-end' }}>
                    <Pressable
                        style={styles.priceButton}
                        onPress={() => setPriceExpensive(!priceExpensive)}
                    >
                        {priceExpensive ? (
                            <>
                                <Text style={styles.priceButtonText}>Preços mais altos</Text>
                                <Ionicons name="arrow-up" size={26} color="black" />
                            </>
                        ) : (
                            <>
                                <Text style={styles.priceButtonText}>Preços mais baixos</Text>
                                <Ionicons name="arrow-down" size={26} color="black" />
                            </>
                        )}
                    </Pressable>
                </View>

                {componentsData
                    .slice()
                    .sort((a, b) => {
                        const priceA = parsePrice(a.price);
                        const priceB = parsePrice(b.price);
                        return priceExpensive ? priceB - priceA : priceA - priceB;
                    })
                    .map((component) => (
                        <AddComponents
                            key={component.id}
                            product={component.name}
                            price={component.price}
                            description={component.description}
                            shop={component.shop}
                            onPress={() => saveSelectedComponent(component)}
                        />
                    ))
                }

                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        </View>
    );
}