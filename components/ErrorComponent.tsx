import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

interface ErrorComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  testID?: string;
}

export default function ErrorComponent({
  title = 'Error',
  message = 'Algo salió mal. Por favor, intenta nuevamente.',
  onRetry,
  retryText = 'Reintentar',
  testID = 'error-component'
}: ErrorComponentProps) {
  return (
    <View style={styles.container} testID={testID}>
      <IconSymbol name="exclamationmark.triangle.fill" size={48} color="#ff3b30" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={onRetry}
          accessibilityLabel={retryText}
          accessibilityRole="button"
          testID={`${testID}-retry`}
        >
          <Text style={styles.retryText}>{retryText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff3b30',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});