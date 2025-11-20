import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { useColorScheme } from '@/components/useColorScheme';
import { colors, spacing } from '@/services/constants/theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.header,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            color: colors.textPrimary,
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="cart/index" 
          options={{ 
            title: 'Carrito de comida',
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => router.back()} 
                style={{ paddingHorizontal: spacing.md }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen 
          name="search/index" 
          options={{ 
            title: 'Buscar comida',
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => router.back()} 
                style={{ paddingHorizontal: spacing.md }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen 
          name="checkout/index" 
          options={{ 
            title: 'Confirmar pedido',
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => router.back()} 
                style={{ paddingHorizontal: spacing.md }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen 
          name="restaurant/[id]/index" 
          options={{ 
            title: 'Detalles del plato',
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => router.back()} 
                style={{ paddingHorizontal: spacing.md }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen 
          name="(auth)/login/index" 
          options={{ 
            title: 'Iniciar sesión',
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => router.back()} 
                style={{ paddingHorizontal: spacing.md }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
