import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c5c5c5',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        marginTop: 20
    },
    textMain: {
        fontWeight: '800',
        fontSize: 18
    },
    content: {
        alignItems: 'center',
        marginTop: 10
    },
    price: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    shop: {
        fontWeight: '900',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10
    }
})