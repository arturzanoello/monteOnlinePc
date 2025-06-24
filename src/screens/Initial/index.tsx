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

                    onPress={() => navigation.navigate('Build')}

                />

                <Button
                    label="Montar Computador"
                    onPress={() => navigation.navigate('ChooseCpu')}

                />
                <View style={{ marginBottom: 40 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}