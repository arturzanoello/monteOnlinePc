import { View, Text, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles";
import { Formik } from 'formik';
import * as Yup from 'yup';

import pc from '../../../assets/pc.png'
import { Input, PasswordInput } from "../../components/Input";
import { Button } from "../../components/button";

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    password: Yup.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
});

export function SignIn({ navigation }: any) {
    const handleSubmit = (values: { email: string; password: string }) => {
        navigation.navigate('Initial');
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
                                <Button label='Entrar' onPress={handleSubmit} size="large">
                                    {null}
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