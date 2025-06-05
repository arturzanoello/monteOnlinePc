// screens/SaveBuild/styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 32,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center'
    },
    scrollView: {
        width: '90%',
        marginBottom: 20,
        maxHeight: '70%',
    },
    componentItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    componentType: {
        fontWeight: 'bold',
        color: '#0066cc',
        fontSize: 16,
        marginBottom: 5,
    },
    componentName: {
        fontSize: 16,
        marginBottom: 3,
        color: '#444',
    },
    priceText: {
        color: '#2c3e50',
        fontWeight: '500',
        fontSize: 16,
    },
    totalContainer: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: '#3498db',
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2c3e50',
        textAlign: 'center',
    },
});