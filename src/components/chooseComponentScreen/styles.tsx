import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 40,
        marginTop: 30,
        textAlign: 'center'
    },
    priceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    priceButtonText: {
        fontWeight: '500',
        fontSize: 20,
        marginRight: 8
    }
})