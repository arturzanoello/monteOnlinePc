import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 50,
        marginTop: 80
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
        marginTop: 20
    }
})