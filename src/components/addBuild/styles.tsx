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
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        marginBottom: 8,
    },
    textContent: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2e7d32',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 12,
    }
})