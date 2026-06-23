import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

export const Skeleton = ({ width, height, style }: { width?: number | string, height?: number | string, style?: any }) => {
    const fadeAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.8,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [fadeAnim]);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                { width, height, opacity: fadeAnim },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
    },
});
