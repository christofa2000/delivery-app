import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

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
      <Ionicons name="search" size={24} color={colors.textPrimary} />
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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: spacing.sm,
          paddingTop: spacing.sm,
        },
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: '600',
        },
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: 'Delivery App',
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
          tabBarIcon: ({ color }) => <TabBarIcon name="pricetag" color={color} />,
          headerTitle: 'Ofertas',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          headerTitle: 'Favoritos',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Cuenta',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          headerTitle: 'Mi Cuenta',
        }}
      />
    </Tabs>
  );
}
