import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getTodos, Todo } from './src/utils/api';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        if (mounted) setTodos(data);
      } catch (err: any) {
        console.error('Error fetching todos:', err.message ?? err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTodos();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Todo List</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      )}
    </View>
  );
}

