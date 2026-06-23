import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export async function requestUserPermission() {
  if (Platform.OS === 'web') return false;

  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error requesting push permission:', error);
    return false;
  }
}

export async function getFCMToken() {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        await AsyncStorage.setItem('fcmToken', token);
        // O ideal é enviar este token para o backend (Supabase) associado ao usuário
      }
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
}

export function setupForegroundMessageListener() {
  return messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // Aqui poderíamos disparar um Toast ou Alert
  });
}
