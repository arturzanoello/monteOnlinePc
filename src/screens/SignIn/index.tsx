import { View, Text, Image, Pressable, ScrollView, SafeAreaView } from "react-native";
import { styles } from "./styles";

import pc from '../../../assets/pc.png'
import { Input } from "../../components/Input";
import { useState } from "react";
import { Button } from "../../components/button";

export function SignIn({ navigation }: any) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    })

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'E-mail inválido';
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Senha é obrigatória';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            navigation.navigate('Initial')
        }
    };

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

                <Input
                    label="E-mail:"
                    value={email}
                    onChangeText={setEmail}
                    error={errors.email}
                    placeholder='Digite seu e-mail'
                />

                <Input
                    label="Senha:"
                    value={password}
                    onChangeText={setPassword}
                    error={errors.password}
                    placeholder="Digite sua senha"
                />

                <View style={{ marginTop: 20 }} />

                <Button label='Entrar' onPress={handleSubmit} />

                <Text style={styles.textRegister} onPress={() => navigation.goBack()}>Voltar</Text>

            </ScrollView>
        </SafeAreaView>
    )
}