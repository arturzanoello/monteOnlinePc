import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80
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
        width: 350,
        height: 300,
        marginTop: 55,
        marginBottom: 85
    },
})