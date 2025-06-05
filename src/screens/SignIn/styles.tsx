import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 35,
    },
    textContent: {
        fontWeight: '500',
        fontSize: 20,
    },
    image: {
        resizeMode: 'contain',
        width: 250,
        height: 250,
        marginTop: 35,
        marginBottom: 25
    },
    button: {
        width: '80%',
        backgroundColor: colors.blue,
        padding: 10,
        borderRadius: 10,
        marginTop: 40
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 19,
        textAlign: 'center',
    },
    textRegister: {
        color: colors.blue,
        fontWeight: '700',
        fontSize: 19,
        marginTop: 20
    }
})