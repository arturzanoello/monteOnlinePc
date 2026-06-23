import React, { useState } from 'react';
import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { Button } from "../button";
import { Image } from 'expo-image';
import { Skeleton } from '../Skeleton';

interface AddComponents {
    product: string;
    price: string;
    description: string;
    shop: string;
    onPress: () => void
}

export function AddComponents({ product, price, description, shop, onPress }: AddComponents) {
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.textMain}>{product}</Text>

            <View style={styles.content}>
                <Text style={[styles.price, { fontSize: 20, fontWeight: '700', color: '#2e7d32' }]}>
                    {price}
                </Text>
                {description.split('\n').map((line, index) => (
                    <Text key={index} style={styles.description}>
                        {line.trim()}
                    </Text>
                ))}
            </View>

            <View style={{ width: '100%', height: 150, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                {imageLoading && <Skeleton width="100%" height={150} style={{ position: 'absolute' }} />}
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80' }} // Placeholder genérico para hardware
                    style={{ width: '100%', height: 150, borderRadius: 8 }}
                    contentFit="cover"
                    cachePolicy="disk" // Cache local para performance
                    onLoadEnd={() => setImageLoading(false)}
                />
            </View>

            <Button
                label="Selecionar"
                onPress={onPress}
                style={{ marginTop: 12, width: '100%' }}
            >
                Selecionar
            </Button>

            <Text style={styles.shop}>{shop.toUpperCase()}</Text>
        </View>
    )
}