import { useQuery } from '@apollo/client';
import { router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CountryItem from '../../components/CountryItem';
import ErrorComponent from '../../components/ErrorComponent';
import FilterSelector from '../../components/FilterSelector';
import LoadingComponent from '../../components/LoadingComponent';
import SearchBar from '../../components/SearchBar';
import {
  FLATLIST_COUNTRY_ITEM_HEIGHT,
  FLATLIST_INITIAL_NUM_TO_RENDER,
  FLATLIST_MAX_TO_RENDER_PER_BATCH,
  SEARCH_DEBOUNCE_MS
} from '../../constants/performance';
import { useDebounce } from '../../hooks/use-common';
import { GET_CONTINENTS, GET_COUNTRIES } from '../../lib/apollo';
import { Continent, Country } from '../../types';

export default function CountriesScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const insets = useSafeAreaInsets();
  
  const debouncedSearchText = useDebounce(searchText, SEARCH_DEBOUNCE_MS);

  const { data: countriesData, loading: countriesLoading, refetch, error } = useQuery(GET_COUNTRIES, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });
  const { data: continentsData } = useQuery(GET_CONTINENTS, {
    errorPolicy: 'all',
  });

  const currencies = useMemo(() => {
    if (!countriesData?.countries) return [];
    const currencySet = new Set<string>();
    countriesData.countries.forEach((country: Country) => {
      if (country.currency) {
        currencySet.add(country.currency);
      }
    });
    return Array.from(currencySet).sort();
  }, [countriesData]);

  const filteredCountries = useMemo(() => {
    if (!countriesData?.countries) return [];
    
    return countriesData.countries.filter((country: Country) => {
      const searchLower = debouncedSearchText.toLowerCase();
      const matchesSearch = debouncedSearchText === '' || 
                           country.name.toLowerCase().includes(searchLower) ||
                           country.code.toLowerCase().includes(searchLower);
      
      const matchesContinent = selectedContinents.length === 0 || 
                              selectedContinents.includes(country.continent.name);
      
      const matchesCurrency = selectedCurrencies.length === 0 || 
                             (country.currency && selectedCurrencies.includes(country.currency));
      
      return matchesSearch && matchesContinent && matchesCurrency;
    });
  }, [countriesData, debouncedSearchText, selectedContinents, selectedCurrencies]);

  const handleCountryPress = useCallback((country: Country) => {
    router.push(`/country/${country.code}`);
  }, []);

  const renderCountryItem = useCallback(({ item }: { item: Country }) => (
    <CountryItem country={item} onPress={handleCountryPress} />
  ), [handleCountryPress]);
  
  const keyExtractor = useCallback((item: Country) => item.code, []);
  
  const getItemLayout = useCallback((_: any, index: number) => ({
    length: FLATLIST_COUNTRY_ITEM_HEIGHT,
    offset: FLATLIST_COUNTRY_ITEM_HEIGHT * index,
    index,
  }), []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <SearchBar 
        value={searchText}
        onChangeText={setSearchText}
      />
      
      <View style={styles.filtersContainer}>
        <FilterSelector
          title="Continente"
          items={continentsData?.continents?.map((c: Continent) => c.name) || []}
          selectedItems={selectedContinents}
          onSelectionChange={setSelectedContinents}
          multiSelect
        />
        
        <FilterSelector
          title="Moneda"
          items={currencies}
          selectedItems={selectedCurrencies}
          onSelectionChange={setSelectedCurrencies}
          multiSelect
        />
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredCountries.length} países encontrados
        </Text>
      </View>
    </View>
  );

  if (error) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <ErrorComponent
          title="Error al cargar países"
          message="No se pudieron cargar los datos. Verifica tu conexión a internet."
          onRetry={() => refetch()}
          testID="countries-error"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {countriesLoading && !countriesData ? (
        <LoadingComponent 
          message="Cargando países..." 
          testID="countries-loading"
        />
      ) : (
        <FlatList
          data={filteredCountries}
          renderItem={renderCountryItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl refreshing={countriesLoading} onRefresh={refetch} />
          }
          showsVerticalScrollIndicator={false}
          initialNumToRender={FLATLIST_INITIAL_NUM_TO_RENDER}
          maxToRenderPerBatch={FLATLIST_MAX_TO_RENDER_PER_BATCH}
          windowSize={10}
          removeClippedSubviews={true}
          getItemLayout={getItemLayout}
          testID="countries-list"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

});
