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
            <Text style={styles.textMain}>{product}</Text>

            <View style={styles.content}>
                <Text style={styles.price}>R${price}</Text>
                <Text style={styles.price}>{description}</Text>
            </View>

            <Button
                label="Selecionar"
                onPress={onPress}
                style={{ marginTop: 10 }}
            >
                Selecionar
            </Button>

            <Text style={styles.shop}>LOJA: {shop.toUpperCase()}</Text>
        </View>
    )
}