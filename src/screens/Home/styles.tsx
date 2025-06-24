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
        fontSize: 19,
        marginTop: 20
    }
})