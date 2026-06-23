import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        paddingBottom: 40,
    },
    textMain: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: 40,
    },
    textContent: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    image: {
        width: 250,
        height: 250,
        marginTop: 30,
        marginBottom: 10,
    },
    textRegister: {
        marginTop: 20,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    }
});
