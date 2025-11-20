import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useCartStore } from '@/services/store/cart-store';
import { colors, spacing, radii } from '@/services/constants/theme';

// Componente para los íconos de la tab bar
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

// Componente personalizado para los labels de la tab bar
function TabBarLabel({ label }: { label: string }) {
  return <Text style={{ fontSize: 12, fontWeight: '500' }}>{label}</Text>;
}

// Botón del carrito con badge
function CartButton() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <TouchableOpacity
      onPress={() => router.push('/cart' as any)}
      style={headerStyles.cartButton}
      activeOpacity={0.7}
    >
      <Ionicons name="cart-outline" size={26} color={colors.textPrimary} />
      {totalItems > 0 && (
        <View style={headerStyles.badge}>
          <Text style={headerStyles.badgeText}>{totalItems > 99 ? '99+' : totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Botón de búsqueda
function SearchButton() {
  return (
    <TouchableOpacity
      onPress={() => router.push('/search' as any)}
      style={headerStyles.searchButton}
      activeOpacity={0.7}
    >
      <Ionicons name="search-outline" size={24} color={colors.textPrimary} />
    </TouchableOpacity>
  );
}

const headerStyles = StyleSheet.create({
  cartButton: {
    marginRight: spacing.lg,
    position: 'relative',
  },
  searchButton: {
    marginRight: spacing.md,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    color: colors.background,
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => {
        // Mapear nombres de ruta a títulos en castellano para tab bar y headers
        const titleMap: Record<string, string> = {
          'offers': 'Ofertas',
          'offers/index': 'Ofertas',
          'favorites': 'Favoritos',
          'favorites/index': 'Favoritos',
          'account': 'Cuenta',
          'account/index': 'Cuenta',
          'index': 'Inicio',
        };

        // Obtener el nombre de la ruta (puede ser "offers" o "offers/index")
        const routeName = route.name;
        // Limpiar el nombre si contiene "/index"
        const cleanRouteName = routeName.replace('/index', '');
        const title = titleMap[routeName] || titleMap[cleanRouteName] || routeName;

        return {
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.footer,
            borderTopWidth: 0,
            borderTopColor: 'transparent',
            height: 64,
            paddingBottom: 8,
            paddingTop: 6,
            // Tab bar flotante
            position: 'absolute',
            left: spacing.lg,
            right: spacing.lg,
            bottom: insets.bottom + 8,
            borderRadius: radii.lg,
            // Sombra ligera para efecto flotante
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
          },
          headerStyle: {
            backgroundColor: colors.header,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          headerTitleStyle: {
            color: colors.textPrimary,
            fontWeight: '600',
          },
          headerTintColor: colors.textPrimary,
          headerShown: useClientOnlyValue(false, true),
          // Levantar el contenido para no quedar detrás del tab bar flotante
          sceneStyle: {
            paddingBottom: 80,
            backgroundColor: colors.backgroundSoft,
          },
          // Establecer título por defecto (será sobrescrito por headerTitle en options individuales)
          title: title,
          headerTitle: title,
        };
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
          headerTitle: 'Demo de App de Comidas',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SearchButton />
              <CartButton />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: 'Ofertas',
          tabBarLabel: (props) => <TabBarLabel label="Ofertas" />,
          tabBarIcon: ({ color }) => <TabBarIcon name="pricetags-outline" color={color} />,
          headerTitle: 'Ofertas',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarLabel: (props) => <TabBarLabel label="Favoritos" />,
          tabBarIcon: ({ color }) => <TabBarIcon name="heart-outline" color={color} />,
          headerTitle: 'Favoritos',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Cuenta',
          tabBarLabel: (props) => <TabBarLabel label="Cuenta" />,
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
          headerTitle: 'Cuenta',
        }}
      />
    </Tabs>
  );
}
