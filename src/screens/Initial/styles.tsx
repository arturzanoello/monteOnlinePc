import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: '#FAFAFA'
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#1A1A1A'
    },
    textContent: {
        fontWeight: '500',
        fontSize: 18,
        color: '#666',
        textAlign: 'center'
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        maxWidth: 300,
        height: undefined,
        aspectRatio: 1.2,
        marginVertical: 10,
    },
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        alignItems: 'flex-start',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginTop: 12,
        marginBottom: 4,
    },
    actionSubtitle: {
        fontSize: 12,
        color: '#888',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    bottomBtn: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 4,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    bottomBtnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 6,
    }
})