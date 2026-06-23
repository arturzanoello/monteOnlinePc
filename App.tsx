import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import { useEffect } from 'react';
import { requestUserPermission, getFCMToken, setupForegroundMessageListener } from './src/services/firebase';
import { registerPricePollingTask } from './src/services/pricePolling';

export default function App() {
  useEffect(() => {
    async function setupServices() {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        await getFCMToken();
      }
      setupForegroundMessageListener();
      await registerPricePollingTask();
    }
    
    setupServices();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Routes />
    </>
  );
}

