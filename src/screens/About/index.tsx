import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "../../components/button";
import Ionicons from '@expo/vector-icons/Ionicons';

export function About({ navigation }: any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back-outline" size={32} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.title}>Sobre</Text>
                </View>

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
                    <Text style={styles.teamMember}>- Érico (Infra/FCM)</Text>
                    <Text style={styles.teamMember}>- Lucas (Frontend/UX)</Text>
                    <Text style={styles.teamMember}>- Equipe Abex V</Text>
                </View>
                <Button label="Voltar" onPress={() => navigation.goBack()} style={{ marginTop: 40, width: '90%' }}>Voltar</Button>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', paddingBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 20, marginBottom: 30 },
    title: { fontSize: 24, fontWeight: 'bold', marginLeft: 15 },
    content: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2 },
    heading: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 5, textAlign: 'center' },
    version: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 15 },
    description: { fontSize: 16, color: '#444', textAlign: 'center', lineHeight: 24, marginBottom: 20 },
    teamMember: { fontSize: 16, color: '#555', textAlign: 'center', marginVertical: 4 }
});
