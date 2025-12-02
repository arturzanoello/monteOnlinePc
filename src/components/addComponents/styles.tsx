import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textMain: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 8,
    },
    content: {
        alignItems: 'center',
        marginTop: 8,
        width: '100%',
    },
    price: {
        fontSize: 15,
        fontWeight: '600',
        color: '#555',
        marginVertical: 4,
        marginBottom: 20,
    },
    description: {
        fontSize: 13,
        fontWeight: '500',
        color: '#666',
        textAlign: 'center',
        lineHeight: 16,
        marginTop: -3,     
        marginBottom: -3,     
        paddingHorizontal: 4,
    },
    shop: {
        fontWeight: '700',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 12,
        color: '#666',
        backgroundColor: '#e8e8e8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    }
})