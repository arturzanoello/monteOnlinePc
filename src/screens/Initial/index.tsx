import { View, Text, Image, ScrollView, SafeAreaView, Pressable } from "react-native";
import { styles } from "./styles";

import pc from '../../../assets/pc.png'
import Ionicons from '@expo/vector-icons/Ionicons';

export function Initial({ navigation }: any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <View style={styles.headerContainer}>
                <Text style={styles.textMain}>Monte Online PC+</Text>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.textContent}>Sua configuração dos sonhos</Text>
                    <Text style={styles.textContent}>a algumas escolhas de você.</Text>
                </View>

                <Image source={pc} style={styles.image} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.actionGrid}>
                    <Pressable
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('ChooseCpu', undefined, { pop: true })}
                    >
                        <Ionicons name="hardware-chip-outline" size={32} color="#2196F3" />
                        <Text style={styles.actionTitle}>Montar Computador</Text>
                        <Text style={styles.actionSubtitle}>Comece do zero</Text>
                    </Pressable>

                    <Pressable
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('Build', undefined, { pop: true })}
                    >
                        <Ionicons name="list-outline" size={32} color="#4CAF50" />
                        <Text style={styles.actionTitle}>Ver Montagens</Text>
                        <Text style={styles.actionSubtitle}>Minhas listas</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.actionCard, { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20 }]}
                        onPress={() => navigation.navigate('AllComponents')}
                    >
                        <View style={{ marginRight: 20 }}>
                            <Ionicons name="search-outline" size={32} color="#FF9800" />
                        </View>
                        <View>
                            <Text style={styles.actionTitle}>Explorar Peças</Text>
                            <Text style={styles.actionSubtitle}>Veja o catálogo completo</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.bottomRow}>
                    <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('PriceAlerts')}>
                        <Ionicons name="notifications-outline" size={24} color="#FF9800" />
                        <Text style={styles.bottomBtnText}>Alertas</Text>
                    </Pressable>
                    <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('Reviews')}>
                        <Ionicons name="star-outline" size={24} color="#9C27B0" />
                        <Text style={styles.bottomBtnText}>Avaliações</Text>
                    </Pressable>
                    <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('About')}>
                        <Ionicons name="information-circle-outline" size={24} color="#607D8B" />
                        <Text style={styles.bottomBtnText}>Sobre</Text>
                    </Pressable>
                </View>

                <View style={{ marginBottom: 40 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}