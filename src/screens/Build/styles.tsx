import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#f5f5f5',
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 40
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '90%',
        flex: 1,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 40,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    emptyText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
    },
    footer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
});