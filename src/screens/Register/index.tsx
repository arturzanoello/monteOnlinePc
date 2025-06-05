import { View, Text } from "react-native";
import { styles } from "./styles";
import { Input } from "../../components/Input";
import { useState } from "react";
import { Button } from "../../components/button";

export function Register({ navigation }: any) {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
        checkPassword: '',
    });

    return (
        <View style={styles.container}>

            <Text style={styles.textMain}>Monte Online PC+</Text>

            <Text style={styles.textContent}>Cadastro</Text>


            <Input
                label="E-mail:"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
                placeholder='Digite seu e-mail'
            />

            <Input
                label="Nome Completo:"
                value={name}
                onChangeText={setName}
                error={errors.name}
                placeholder='Digite seu nome completo'
            />

            <Input
                label="Senha:"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                placeholder='Digite sua senha'
            />

            <Input
                label="Confirme sua senha:"
                value={checkPassword}
                onChangeText={setCheckPassword}
                error={errors.checkPassword}
                placeholder='Confirme sua senha'
            />

            <View style={{ marginTop: 50 }} />

            <Button
                label="Cadastrar"
                onPress={() => navigation.navigate('')}
            />

            <Text style={styles.textRegister} onPress={() => navigation.goBack()}>Voltar</Text>
        </View>
    )
}