import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Skeleton } from '../Skeleton';

interface ProductPreviewProps {
  productUrl: string | undefined;
  style?: any;
}

export function ProductPreview({ productUrl, style }: ProductPreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductImage() {
      if (!productUrl) {
        setLoading(false);
        return;
      }

      try {
        // Substitua pelo IP da sua máquina rodando o Next.js ou a URL de produção
        // Exemplo: http://192.168.1.5:3000
        // Para iOS Simulator localmente: http://localhost:3000
        // Para Android Emulator localmente: http://10.0.2.2:3000
        const apiUrl = `http://localhost:3000/api/preview?url=${encodeURIComponent(productUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.imageUrl) {
          setImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.error('Erro ao buscar imagem da API:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductImage();
  }, [productUrl]);

  return (
    <View style={[styles.container, style]}>
      {loading ? (
        <Skeleton width="100%" height="100%" style={{ position: 'absolute' }} />
      ) : imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          contentFit="contain" 
          cachePolicy="disk"
        />
      ) : (
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80' }} 
          style={styles.image} 
          contentFit="cover" 
          cachePolicy="disk"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  }
});
