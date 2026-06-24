import AsyncStorage from '@react-native-async-storage/async-storage';
import { ComponentData } from './componentHelper';

const ALERTS_KEY = '@price_alerts';

export interface PriceAlert extends ComponentData {
    alertAddedAt: string;
}

export const getPriceAlerts = async (): Promise<PriceAlert[]> => {
    try {
        const data = await AsyncStorage.getItem(ALERTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error fetching price alerts:', error);
        return [];
    }
};

export const addPriceAlert = async (component: ComponentData): Promise<boolean> => {
    try {
        const alerts = await getPriceAlerts();
        
        // Verifica se já existe um alerta para este ID
        if (alerts.some(alert => alert.id === component.id)) {
            return false; // Já tem alerta
        }
        
        const newAlert: PriceAlert = {
            ...component,
            alertAddedAt: new Date().toISOString()
        };
        
        alerts.push(newAlert);
        await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
        return true;
    } catch (error) {
        console.error('Error adding price alert:', error);
        return false;
    }
};

export const removePriceAlert = async (id: string): Promise<boolean> => {
    try {
        const alerts = await getPriceAlerts();
        const newAlerts = alerts.filter(alert => alert.id !== id);
        await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(newAlerts));
        return true;
    } catch (error) {
        console.error('Error removing price alert:', error);
        return false;
    }
};

export const hasPriceAlert = async (id: string): Promise<boolean> => {
    try {
        const alerts = await getPriceAlerts();
        return alerts.some(alert => alert.id === id);
    } catch (error) {
        return false;
    }
};
