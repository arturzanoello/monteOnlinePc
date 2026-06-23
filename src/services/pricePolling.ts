import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';
// import messaging from '@react-native-firebase/messaging'; // Para envio de push local, mas preferencialmente via server

const PRICE_POLLING_TASK = 'BACKGROUND_PRICE_POLLING_TASK';

TaskManager.defineTask(PRICE_POLLING_TASK, async () => {
  try {
    console.log('[BackgroundFetch] Polling prices...');
    
    // Recupera últimos preços cacheados
    const cachedPricesStr = await AsyncStorage.getItem('@cached_prices');
    const cachedPrices = cachedPricesStr ? JSON.parse(cachedPricesStr) : {};
    
    // Na vida real, consultaríamos as peças favoritas do usuário
    // Para simplificar, buscamos peças populares ou as que caíram muito de preço
    const { data: pecas } = await supabase
      .from('pecas')
      .select('id, nome_produto, preco_pix')
      .limit(10);
      
    if (!pecas) return BackgroundFetch.BackgroundFetchResult.NoData;

    let notificationSent = false;

    pecas.forEach(peca => {
      const oldPrice = cachedPrices[peca.id];
      if (oldPrice && peca.preco_pix) {
        const dropPercentage = ((oldPrice - peca.preco_pix) / oldPrice) * 100;
        
        // Se o preço caiu mais de 5%
        if (dropPercentage >= 5) {
            console.log(`[Price Drop Alert] ${peca.nome_produto} caiu ${dropPercentage.toFixed(2)}%!`);
            // Disparar notificação local ou log
            notificationSent = true;
        }
      }
      
      // Atualiza cache
      cachedPrices[peca.id] = peca.preco_pix;
    });

    await AsyncStorage.setItem('@cached_prices', JSON.stringify(cachedPrices));
    
    return notificationSent 
      ? BackgroundFetch.BackgroundFetchResult.NewData 
      : BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (error) {
    console.error('[BackgroundFetch] Error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerPricePollingTask() {
  try {
    await BackgroundFetch.registerTaskAsync(PRICE_POLLING_TASK, {
      minimumInterval: 60 * 60 * 6, // 6 horas
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log('[BackgroundFetch] Task registered!');
  } catch (err) {
    console.log('[BackgroundFetch] Task Register failed:', err);
  }
}

export async function unregisterPricePollingTask() {
  try {
    await BackgroundFetch.unregisterTaskAsync(PRICE_POLLING_TASK);
  } catch (err) {
    console.log('[BackgroundFetch] Task Unregister failed:', err);
  }
}
