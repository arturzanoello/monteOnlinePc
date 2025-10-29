import React from 'react';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from "react-native-paper";
import { ViewStyle } from "react-native";

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = Omit<PaperButtonProps, 'children'> & {
    icon?: string;
    label: string;
    // allow flexible handler signatures (Touchable/Formik handlers) — we forward this to the underlying button
    onPress?: (...args: any[]) => void;
    size?: ButtonSize;
    children?: React.ReactNode;
}

export function Button({ icon, label, onPress, size = 'large', style, labelStyle, ...rest }: ButtonProps) {
    const getButtonStyle = (size: ButtonSize): ViewStyle => {
        switch (size) {
            case 'small':
                return {
                    width: '30%',
                    borderRadius: 8,
                };
            case 'large':
                return {
                    width: '90%',
                    borderRadius: 8,
                };
            default:
                return {
                    width: '60%',
                    borderRadius: 8,
                };
        }
    };

    const getLabelStyle = (size: ButtonSize) => {
        switch (size) {
            case 'small':
                return { fontSize: 12 };
            case 'large':
                return { fontSize: 16 };
            default:
                return { fontSize: 14 };
        }
    };

    return (
        <PaperButton
            mode="contained"
            onPress={onPress}
            icon={icon}
            buttonColor="#2196F3"
            textColor="white"
            {...rest}
            style={[getButtonStyle(size), style]}
            labelStyle={[getLabelStyle(size), labelStyle]}
        >
            {/** Prefer explicit children if provided, otherwise render label prop */}
            { (rest as any).children ?? label }
        </PaperButton>
    )
}
