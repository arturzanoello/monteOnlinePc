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
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#FAFAFA',
        position: 'relative',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A'
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