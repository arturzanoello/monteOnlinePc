import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        padding: 20
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 30,
    },
    textContent: {
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 40
    },
    textRegister: {
        color: colors.blue,
        fontWeight: '700',
        fontSize: 19,
        marginTop: 20,
        marginBottom: 40
    }
})