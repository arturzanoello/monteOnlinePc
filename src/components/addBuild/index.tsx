import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface AddBuildProps {
    id: number;
    price: string;
    onPress: () => void;
    onDelete: () => void;
}

export function AddBuild({ id, price, onPress, onDelete }: AddBuildProps) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.container,
                pressed && { transform: [{ scale: 0.98 }] }
            ]}
            onPress={onPress}
        >
            <LinearGradient
                colors={['#ffffff', '#fcfcfc']}
                style={styles.gradientCard}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name="hardware-chip" size={32} color="#0066cc" />
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Montagem {id}</Text>
                    <Text style={styles.priceBadge}>{price}</Text>
                </View>

                <View style={styles.actionContainer}>
                    <Pressable 
                        style={styles.editButton} 
                        onPress={onPress}
                    >
                        <Ionicons name="create-outline" size={20} color="#0066cc" />
                    </Pressable>
                    <Pressable 
                        style={styles.deleteButton} 
                        onPress={onDelete}
                    >
                        <Ionicons name="trash-outline" size={20} color="#d32f2f" />
                    </Pressable>
                </View>
            </LinearGradient>
        </Pressable>
    )
}