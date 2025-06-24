import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 40,
        marginTop: 30,
        textAlign: 'center'
    },
    content: {
        padding: 15,
        backgroundColor: '#cacaca',
        borderRadius: 15,
    },
    textContent: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginRight: 15,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    quantityText: {
        marginHorizontal: 8,
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
    },
    totalContainer: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: '#3498db',
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2c3e50',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollContent: {
        maxHeight: 300,
        marginBottom: 20,
    },
    textDelete: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
        fontWeight: '500'
    }
})