import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { Button } from "../button";

import Ionicons from '@expo/vector-icons/Ionicons';

interface AddBuildProps {
    id: number;
    price: string;
    onPress: () => void;
    onDelete: () => void;
}

export function AddBuild({ id, price, onPress, onDelete }: AddBuildProps) {
    return (
        <View style={styles.container}>
            <Pressable 
                style={{ position: 'absolute', top: 12, right: 12, padding: 4, zIndex: 10 }} 
                onPress={onDelete}
            >
                <Ionicons name="trash-outline" size={24} color="#d32f2f" />
            </Pressable>

            <Text style={styles.textMain}>Montagem {id}</Text>
            <Text style={styles.textContent}>{price}</Text>

            <Button
                label="Editar"
                onPress={onPress}
                style={{ marginTop: 8, width: '100%' }}
            >
                Editar
            </Button>
        </View>
    )
}