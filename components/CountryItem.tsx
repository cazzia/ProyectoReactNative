import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Country } from '../types';
import { IconSymbol } from './ui/icon-symbol';

interface CountryItemProps {
  country: Country;
  onPress: (country: Country) => void;
  testID?: string;
}

function CountryItem({ country, onPress, testID }: CountryItemProps) {
  const handlePress = useCallback(() => {
    onPress(country);
  }, [country, onPress]);
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityLabel={`${country.name}, ${country.continent.name}`}
      accessibilityHint={`Toca para ver detalles de ${country.name}`}
      accessibilityRole="button"
      testID={testID || `country-item-${country.code}`}
    >
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>🌍</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{country.name}</Text>
          <Text style={styles.code}>{country.code}</Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <IconSymbol name="globe" size={14} color="#666" />
            <Text style={styles.detailText}>{country.continent.name}</Text>
          </View>
          
          {country.currency && (
            <View style={styles.detailRow}>
              <IconSymbol name="dollarsign.circle" size={14} color="#666" />
              <Text style={styles.detailText}>{country.currency}</Text>
            </View>
          )}
        </View>
      </View>
      
      <IconSymbol name="chevron.right" size={16} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  flagContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  flag: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  code: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
  },
});

// Memoize component to prevent unnecessary re-renders
export default React.memo(CountryItem, (prevProps, nextProps) => {
  return (
    prevProps.country.code === nextProps.country.code &&
    prevProps.country.name === nextProps.country.name &&
    prevProps.onPress === nextProps.onPress
  );
});