import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: '100%'
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 35
    },
    textContent: {
        fontWeight: '500',
        fontSize: 20,
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        maxWidth: 350,
        height: undefined,
        aspectRatio: 1,
        marginVertical: 20,
    },
    textRegister: {
        color: colors.blue,
        fontWeight: '700',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 40
    }
})