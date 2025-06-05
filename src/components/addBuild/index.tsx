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
            <Text style={styles.textMain}>Montagem {id}</Text>
            <Text style={styles.textContent}>{price}</Text>

            <Button
                label="Editar"
                onPress={onPress}
            />

            <Pressable style={{ position: 'absolute', alignSelf: 'flex-end', padding: 20 }} onPress={onDelete}>
                <Ionicons name="trash-outline" size={26} color="black" />
            </Pressable>


        </View>
    )
}