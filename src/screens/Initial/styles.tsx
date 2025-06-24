import { StyleSheet } from "react-native";


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
})