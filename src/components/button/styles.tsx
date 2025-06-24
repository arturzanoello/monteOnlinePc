import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        width: '85%',
        maxWidth: 350,
        alignSelf: 'center',
        marginTop: 15
    },
    button: {
        backgroundColor: colors.blue,
        padding: 10,
        borderRadius: 15,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 19,
        textAlign: 'center',
        flex: 1
    },
    iconcontainer: {
        position: 'absolute'
    }
})