import { View, Text, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { styles } from "./styles";
import { Input} from "../../components/Input";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from "../../components/button";
import pc from '../../../assets/pc.png';
import { supabase } from "../../utils/supabase";
import { useState } from "react";

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail inválido')
        .required('E-mail é obrigatório'),
    password: Yup.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
    checkPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Senhas devem ser iguais')
        .required('Confirmação de senha é obrigatória'),
});

export function Register({ navigation }: any) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { email: string; password: string; checkPassword: string }) => {
        setLoading(true);
        
        try {
            // Insere o novo usuário na tabela usuario
            const { data, error } = await supabase
                .from('usuario')
                .insert([
                    {
                        login: values.email,
                        senha: values.password
                    }
                ])
                .select();

            if (error) {
                console.error('Erro ao cadastrar usuário:', error.message);
                
                // Verifica se é erro de login duplicado
                if (error.code === '23505') {
                    Alert.alert('Erro', 'Este email já está cadastrado.');
                } else {
                    Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente.');
                }
                return;
            }

            if (data && data.length > 0) {
                Alert.alert(
                    'Sucesso!',
                    'Cadastro realizado com sucesso!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('SignIn')
                        }
                    ]
                );
            }
        } catch (error: any) {
            console.error('Erro ao cadastrar usuário:', error.message);
            Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <Text style={styles.textMain}>Monte Online PC+</Text>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.textContent}>Crie sua conta e comece</Text>
                        <Text style={styles.textContent}>a montar seu PC dos sonhos.</Text>
                    </View>

                    <Image source={pc} style={styles.image} />

                    <Formik
                        initialValues={{ email: '', password: '', checkPassword: '' }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldError }) => (
                            <>
                                <View style={{ width: '90%', marginTop: 20 }}>
                                    <Input
                                        label="Digite seu email"
                                        value={values.email}
                                        onChangeText={(text) => {
                                            handleChange('email')(text);
                                            if (errors.email) {
                                                setFieldError('email', '');
                                            }
                                        }}
                                        onBlur={handleBlur('email')}
                                        error={!!errors.email}
                                    />
                                    {errors.email && (
                                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                                            {errors.email}
                                        </Text>
                                    )}

                                    <Input
                                        label="Digite sua senha"
                                        secureTextEntry
                                        value={values.password}
                                        onChangeText={(text) => {
                                            handleChange('password')(text);
                                            if (errors.password) {
                                                setFieldError('password', '');
                                            }
                                        }}
                                        onBlur={handleBlur('password')}
                                        error={!!errors.password}
                                    />
                                    {errors.password && (
                                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                                            {errors.password}
                                        </Text>
                                    )}

                                    <Input
                                        label="Confirme sua senha"
                                        value={values.checkPassword}
                                        secureTextEntry
                                        onChangeText={(text) => {
                                            handleChange('checkPassword')(text);
                                            if (errors.checkPassword) {
                                                setFieldError('checkPassword', '');
                                            }
                                        }}
                                        onBlur={handleBlur('checkPassword')}
                                        error={!!errors.checkPassword}
                                    />
                                    {errors.checkPassword && (
                                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                                            {errors.checkPassword}
                                        </Text>
                                    )}

                                    <View style={{ marginTop: 20 }} />

                                </View>

                                <Button
                                    label="Cadastrar"
                                    onPress={handleSubmit}
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                                </Button>

                            </>
                        )}
                    </Formik>

                    <Text style={styles.textRegister} onPress={() => navigation.goBack()}>Voltar</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}