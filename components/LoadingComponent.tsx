import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

interface LoadingComponentProps {
  message?: string;
  testID?: string;
}

export default function LoadingComponent({
  message = 'Cargando...',
  testID = 'loading-component'
}: LoadingComponentProps) {
  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});