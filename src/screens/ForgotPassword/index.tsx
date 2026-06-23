import { View, Text, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { styles } from "./styles";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import pc from '../../../assets/pc.png';
import { Input } from "../../components/Input";
import { Button } from "../../components/button";
import { supabase } from "../../utils/supabase";

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail inválido')
        .required('E-mail é obrigatório'),
});

export function ForgotPassword({ navigation }: any) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { email: string }) => {
        setLoading(true);
        
        try {
            const { data, error } = await supabase
                .from('usuario')
                .select('*')
                .eq('login', values.email)
                .single();

            if (error) {
                Alert.alert('Erro', 'E-mail não encontrado na nossa base de dados.');
                return;
            }

            if (data) {
                Alert.alert('Sucesso!', 'Se este email estiver cadastrado, enviaremos instruções de recuperação.', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            }
        } catch (error: any) {
            Alert.alert('Erro', 'Ocorreu um erro inesperado.');
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
                >
                    <Text style={styles.textMain}>Recuperar Senha</Text>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.textContent}>Informe seu e-mail cadastrado</Text>
                        <Text style={styles.textContent}>para recuperar a sua senha.</Text>
                    </View>

                    <Image source={pc} style={styles.image} />

                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldError }) => (
                            <>
                                <View style={{ width: '90%', marginTop: 20 }}>
                                    <Input
                                        label="Digite seu email"
                                        value={values.email}
                                        onChangeText={(text) => {
                                            handleChange('email')(text);
                                            if (errors.email) setFieldError('email', '');
                                        }}
                                        onBlur={handleBlur('email')}
                                        error={!!errors.email}
                                    />
                                    {errors.email && (
                                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                                            {errors.email as string}
                                        </Text>
                                    )}

                                    <View style={{ marginTop: 20 }} />
                                </View>
                                <Button 
                                    label='Enviar Instruções' 
                                    onPress={handleSubmit} 
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? 'Enviando...' : 'Enviar Instruções'}
                                </Button>
                            </>
                        )}
                    </Formik>

                    <Text style={styles.textRegister} onPress={() => navigation.goBack()}>Voltar ao Login</Text>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
