import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";

interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error: string;
    placeholder: string;
}

export function Input({ label, value, onChangeText, error, placeholder }: InputProps) {
    return (
        <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={styles.textInput}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}