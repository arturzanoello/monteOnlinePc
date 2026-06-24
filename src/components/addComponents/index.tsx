import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert } from "react-native";
import { styles } from "./styles";
import { Button } from "../button";
import { Skeleton } from '../Skeleton';
import { ComponentData } from '../../utils/componentHelper';
import { addPriceAlert, removePriceAlert, hasPriceAlert } from '../../utils/priceAlertsHelper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProductPreview } from '../ProductPreview';

interface AddComponentsProps {
    componentData: ComponentData;
    onPress?: () => void;
    buttonLabel?: string;
    hideSelectButton?: boolean;
    onAlertChanged?: () => void; // Callback para quando o alerta for removido (útil na tela de PriceAlerts)
}

export function AddComponents({ componentData, onPress, buttonLabel = "Selecionar", hideSelectButton = false, onAlertChanged }: AddComponentsProps) {
    const [isAlertActive, setIsAlertActive] = useState(false);

    useEffect(() => {
        const checkAlert = async () => {
            const hasAlert = await hasPriceAlert(componentData.id);
            setIsAlertActive(hasAlert);
        };
        checkAlert();
    }, [componentData.id]);

    const toggleAlert = async () => {
        if (isAlertActive) {
            const removed = await removePriceAlert(componentData.id);
            if (removed) {
                setIsAlertActive(false);
                if (onAlertChanged) onAlertChanged();
            }
        } else {
            const added = await addPriceAlert(componentData);
            if (added) {
                setIsAlertActive(true);
                Alert.alert("Sucesso", "Alerta de preço configurado! Você será avisado quando o preço cair.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <Text style={[styles.textMain, { flex: 1, marginRight: 10 }]}>{componentData.name}</Text>

                <Pressable onPress={toggleAlert} style={{ padding: 5 }}>
                    <Ionicons
                        name={isAlertActive ? "notifications" : "notifications-outline"}
                        size={24}
                        color={isAlertActive ? "#FF9800" : "#666"}
                    />
                </Pressable>
            </View>

            <View style={styles.content}>
                <Text style={[styles.price, { fontSize: 20, fontWeight: '700', color: '#2e7d32' }]}>
                    {componentData.price}
                </Text>
                {componentData.description.split('\n').map((line, index) => (
                    <Text key={index} style={styles.description}>
                        {line.trim()}
                    </Text>
                ))}
            </View>

            <View style={{ width: '100%', height: 150, marginVertical: 10 }}>
                <ProductPreview productUrl={componentData.url} />
            </View>

            {!hideSelectButton && onPress && (
                <Button
                    label={buttonLabel}
                    onPress={onPress}
                    style={{ marginTop: 12, width: '100%' }}
                >
                    {buttonLabel}
                </Button>
            )}

            <Text style={styles.shop}>{componentData.shop.toUpperCase()}</Text>
        </View>
    )
}