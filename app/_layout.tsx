import { ApolloProvider } from '@apollo/client';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

import { useColorScheme } from '../hooks/use-color-scheme';
import { client } from '../lib/apollo';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <PaperProvider theme={colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SafeAreaView style={styles.container} edges={['top']}>
              <Stack screenOptions={{
                contentStyle: { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }
              }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                <Stack.Screen 
                  name="country/[code]" 
                  options={{ 
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
                    },
                    headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
                    headerTitleStyle: {
                      fontWeight: '600',
                    },
                  }} 
                />
              </Stack>
            </SafeAreaView>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PaperProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
