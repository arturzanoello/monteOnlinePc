import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "../../components/button";
import Ionicons from '@expo/vector-icons/Ionicons';

export function About({ navigation }: any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <View style={{ ...styles.header, justifyContent: 'center' }}>
                <Ionicons style={{ position: 'absolute', left: 20, zIndex: 1 }} name="arrow-back-outline" size={32} color="black" onPress={() => navigation.goBack()} />
                <Text style={styles.title}>Sobre</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.content}>
                    <Ionicons name="information-circle-outline" size={80} color="#2196F3" style={{ alignSelf: 'center', marginBottom: 20 }} />
                    <Text style={styles.heading}>Monte Online PC+</Text>
                    <Text style={styles.version}>Versão 1.0.0</Text>
                    <Text style={styles.description}>
                        O Monte Online PC+ é o seu assistente definitivo para montar o PC dos sonhos.
                        Com validações de compatibilidade, acompanhamento de preços e alertas,
                        você terá certeza de fazer a melhor compra.
                    </Text>

                    <Text style={styles.heading}>Equipe de Desenvolvimento</Text>
                    <Text style={styles.teamMember}>Érico Campos Kempfer (dev)</Text>
                    <Text style={styles.teamMember}>Vitor Benedett Caldas (scrum master)</Text>
                    <Text style={styles.teamMember}>Artur Zanoello (dev)</Text>
                    <Text style={styles.teamMember}>Lucas Sehn Klauck (PO)</Text>
                    <Text style={styles.teamMember}>Vinicius de Morais Franzen Cordeiro (dev)</Text>
                    <Text style={styles.teamMember}>Mario Antonio Fribel (dev)</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', paddingBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30, paddingHorizontal: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    content: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2 },
    heading: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 5, textAlign: 'center' },
    version: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 15 },
    description: { fontSize: 16, color: '#444', textAlign: 'center', lineHeight: 24, marginBottom: 20 },
    teamMember: { fontSize: 16, color: '#555', textAlign: 'center', marginVertical: 4 }
});
