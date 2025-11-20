import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useCartStore } from '@/services/store/cart-store';

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
      <Ionicons name="cart-outline" size={26} color="#333" />
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
      <Ionicons name="search" size={24} color="#333" />
    </TouchableOpacity>
  );
}

const headerStyles = StyleSheet.create({
  cartButton: {
    marginRight: 16,
    position: 'relative',
  },
  searchButton: {
    marginRight: 12,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#e91e63',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
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
