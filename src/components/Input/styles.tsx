import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.black
    },
    textInput: {
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: colors.black
    },
    error: {
        color: 'red',
        marginTop: 4,
    },
})