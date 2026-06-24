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
    content: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textContent: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    componentInfo: {
        flex: 1,
        marginLeft: 12,
        marginRight: 12,
    },
    componentType: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    componentName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    componentPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2e7d32',
    },
    editButton: {
        padding: 8,
        backgroundColor: '#f0f8f0',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c8e6c9',
    },
    textItem: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        marginRight: 12,
        color: '#333',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    quantityText: {
        marginHorizontal: 8,
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
    },
    totalContainer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 2,
        borderTopColor: '#e0e0e0',
    },
    totalText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#2e7d32',
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
        fontWeight: '500',
        marginBottom: 40
    }
})