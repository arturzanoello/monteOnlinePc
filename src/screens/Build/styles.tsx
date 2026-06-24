import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#f5f5f5',
        position: 'relative',
        width: '100%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A'
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