import { View, Text, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { styles } from "./styles";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";

import pc from '../../../assets/pc.png'
import { Input, PasswordInput } from "../../components/Input";
import { Button } from "../../components/button";
import { supabase } from "../../utils/supabase";
import { saveUser } from "../../utils/storage";

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail inválido')
        .required('E-mail é obrigatório'),
    password: Yup.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
});

export function SignIn({ navigation }: any) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { email: string; password: string }) => {
        setLoading(true);
        
        try {
            // Busca o usuário no banco de dados
            const { data: usuarios, error } = await supabase
                .from('usuario')
                .select('*')
                .eq('login', values.email)
                .eq('senha', values.password)
                .single();

            if (error) {
                console.error('Erro ao buscar usuário:', error.message);
                
                // Se não encontrou o usuário (erro PGRST116)
                if (error.code === 'PGRST116') {
                    Alert.alert('Erro', 'Email ou senha incorretos.');
                } else {
                    Alert.alert('Erro', 'Não foi possível fazer login. Tente novamente.');
                }
                return;
            }

            if (usuarios) {
                // Salva os dados do usuário no AsyncStorage
                await saveUser(usuarios);
                
                // Navega direto para a tela Initial
                navigation.navigate('Initial');
            }
        } catch (error: any) {
            console.error('Erro ao fazer login:', error.message);
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
                        <Text style={styles.textContent}>Sua configuração dos sonhos</Text>
                        <Text style={styles.textContent}>a algumas escolhas de você.</Text>
                    </View>

                    <Image source={pc} style={styles.image} />

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={SignInSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldError }) => (
                            <>
                                <View style={{ width: '90%', marginTop: 20 }}>
                                    <Input
                                        label="Digite seu email"
                                        autoCapitalize="none"
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

                                    <PasswordInput
                                        label="Digite sua senha"
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

                                    <View style={{ marginTop: 20 }} />

                                </View>
                                <Button 
                                    label='Entrar' 
                                    onPress={handleSubmit} 
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </Button>
                            </>
                        )}
                    </Formik>

                    <Text style={{ ...styles.textRegister, marginTop: 10, marginBottom: 10 }} onPress={() => navigation.navigate('ForgotPassword')}>Esqueceu a senha?</Text>
                    <Text style={styles.textRegister} onPress={() => navigation.goBack()}>Voltar</Text>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}