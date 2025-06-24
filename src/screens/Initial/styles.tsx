import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        padding: 20
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
})