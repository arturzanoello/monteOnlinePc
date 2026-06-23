import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import { useEffect } from 'react';
import { registerPricePollingTask } from './src/services/pricePolling';

export default function App() {
  useEffect(() => {
    async function setupServices() {
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

