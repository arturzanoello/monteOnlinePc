import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";

interface ButtonProps {
    icon?: React.ReactNode
    label: string;
    onPress: () => void;
}

export function Button({ icon, label, onPress }: ButtonProps) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {icon && <View style={styles.iconcontainer}>{icon}</View>}
                    <Text style={styles.buttonText}>{label}</Text>
                </View>

            </Pressable>
        </View>
    )
}
