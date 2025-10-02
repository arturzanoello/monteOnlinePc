import { useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { Colors } from "../../styles/colors";

interface InputProps extends TextInputProps {
}

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry' | 'right'> {
}

export function Input({ label, value, onChangeText, style, right, ...rest }: InputProps) {
    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            mode="outlined"
            activeOutlineColor={Colors.black}
            style={[{ height: 45, marginTop: 3 }, style]}
            {...rest}
        />
    )
}

export function PasswordInput({ label, value, onChangeText, style, ...rest }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            mode="outlined"
            activeOutlineColor={Colors.black}
            style={[{ height: 45, marginTop: 3 }, style]}
            secureTextEntry={!showPassword}
            right={
                <TextInput.Icon
                    icon={showPassword ? "eye" : "eye-off"}
                    onPressIn={toggleShowPassword}
                    forceTextInputFocus={false}
                />
            }
            {...rest}
        />
    )
}

export const InputIcon = TextInput.Icon;