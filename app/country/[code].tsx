import { useQuery } from '@apollo/client';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HLSVideoPlayer from '../../components/HLSVideoPlayer';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { getPrimaryVideoSource } from '../../constants/video-sources';
import { GET_COUNTRY } from '../../lib/apollo';
import { Country } from '../../types';

export default function CountryDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const insets = useSafeAreaInsets();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  const country: Country = data?.country;
  const videoSource = getPrimaryVideoSource();

  if (loading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Cargando...' }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando información del país...</Text>
        </View>
      </View>
    );
  }

  if (error || !country) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Error' }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al cargar el país</Text>
          <Text style={styles.errorSubtext}>
            {error?.message || 'No se pudo encontrar la información del país'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: country.name }} />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}>
        {/* Header with country flag */}
        <View style={styles.header}>
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>🌍</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.countryName}>{country.name}</Text>
            <Text style={styles.countryCode}>{country.code}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Básica</Text>
          
          <View style={styles.infoGrid}>
            <InfoItem
              icon="globe"
              label="Continente"
              value={country.continent.name}
            />
            
            {country.currency && (
              <InfoItem
                icon="dollarsign.circle"
                label="Moneda"
                value={country.currency}
              />
            )}
            
            {country.capital && (
              <InfoItem
                icon="building.2"
                label="Capital"
                value={country.capital}
              />
            )}
            
            {country.languages && country.languages.length > 0 && (
              <InfoItem
                icon="text.bubble"
                label="Idiomas"
                value={country.languages.map(lang => lang.name).join(', ')}
              />
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Video Destacado</Text>
          <Text style={styles.sectionSubtitle}>
            Contenido multimedia en streaming HLS de {country.name}
          </Text>
          
          <HLSVideoPlayer
            source={videoSource.url}
            title={`${videoSource.title} - ${country.name}`}
          />
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

interface InfoItemProps {
  icon: 'globe' | 'dollarsign.circle' | 'building.2' | 'text.bubble';
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoHeader}>
        <IconSymbol name={icon} size={16} color="#007AFF" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff3b30',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  flagContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  flag: {
    fontSize: 40,
  },
  headerInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bottomSpacer: {
    height: 32,
  },
  videoInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  videoInfoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
});