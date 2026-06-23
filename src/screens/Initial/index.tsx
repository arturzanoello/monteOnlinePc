import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { styles } from "./styles";

import pc from '../../../assets/pc.png'
import { Button } from "../../components/button";

export function Initial({ navigation }: any) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.textMain}>Monte Online PC+</Text>

                <View style={{ marginTop: 30 }}>
                    <Text style={styles.textContent}>Sua configuração dos sonhos</Text>
                    <Text style={styles.textContent}>a algumas escolhas de você.</Text>
                </View>

                <Image source={pc} style={styles.image} />

                <Button
                    label="Ver montagens"
                    onPress={() => navigation.navigate('Build', undefined, { pop: true })}
                >
                    Ver montagens
                </Button>

                <Button
                    label="Montar Computador"
                    style={{ marginTop: 10 }}
                    onPress={() => navigation.navigate('ChooseCpu', undefined, { pop: true })}
                >
                    Montar Computador
                </Button>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 30 }}>
                    <Button label="Alertas" onPress={() => navigation.navigate('PriceAlerts')} style={{ flex: 1, marginRight: 5, backgroundColor: '#FF9800' }}>Alertas</Button>
                    <Button label="Avaliações" onPress={() => navigation.navigate('Reviews')} style={{ flex: 1, marginHorizontal: 5, backgroundColor: '#9C27B0' }}>Avaliações</Button>
                    <Button label="Sobre" onPress={() => navigation.navigate('About')} style={{ flex: 1, marginLeft: 5, backgroundColor: '#607D8B' }}>Sobre</Button>
                </View>

                <View style={{ marginBottom: 40 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}