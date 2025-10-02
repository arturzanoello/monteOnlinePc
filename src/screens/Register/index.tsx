import { View, Text, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles";
import { Input, PasswordInput } from "../../components/Input";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from "../../components/button";
import pc from '../../../assets/pc.png';

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    name: Yup.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .required('Nome é obrigatório'),
    password: Yup.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
    checkPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Senhas devem ser iguais')
        .required('Confirmação de senha é obrigatória'),
});

export function Register({ navigation }: any) {
    const handleSubmit = (values: { email: string; name: string; password: string; checkPassword: string }) => {
        navigation.navigate('Home');
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
                        initialValues={{ email: '', name: '', password: '', checkPassword: '' }}
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
                                        label="Nome Completo"
                                        value={values.name}
                                        onChangeText={(text) => {
                                            handleChange('name')(text);
                                            if (errors.name) {
                                                setFieldError('name', '');
                                            }
                                        }}
                                        onBlur={handleBlur('name')}
                                        error={!!errors.name}
                                    />
                                    {errors.name && (
                                        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                                            {errors.name}
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

                                    <PasswordInput
                                        label="Confirme sua senha"
                                        value={values.checkPassword}
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
                                >
                                    Cadastrar
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