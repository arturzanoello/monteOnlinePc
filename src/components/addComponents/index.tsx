import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { Button } from "../button";

interface AddComponents {
    product: string;
    price: string;
    description: string;
    shop: string;
    onPress: () => void
}

export function AddComponents({ product, price, description, shop, onPress }: AddComponents) {
    return (
        <View style={styles.container}>
            <Text style={styles.textMain} numberOfLines={2}>{product}</Text>

            <View style={styles.content}>
                <Text style={[styles.price, { fontSize: 20, fontWeight: '700', color: '#2e7d32' }]}>
                    {price}
                </Text>
                <Text style={styles.price} numberOfLines={2}>{description}</Text>
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