import React, { FC, useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import SearchBar from '@/components/search-bar';
import FoodCard from '@/components/food-card';
import { categorySections } from '@/services/constants/mock-data';
import { useCartStore } from '@/services/store/cart-store';
import { FoodItem } from '@/services/types/api-types';
import { styles } from './styles';

const Home: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, loadCart, isLoaded } = useCartStore();

  // Cargar el carrito al iniciar la app
  useEffect(() => {
    if (!isLoaded) {
      loadCart();
    }
  }, [isLoaded, loadCart]);

  const handleFoodItemPress = (item: FoodItem) => {
    // TODO: Navegar al detalle del producto
    console.log('Producto seleccionado:', item.name);
  };

  const handleAddToCart = (item: FoodItem) => {
    addItem(item);
    console.log('Agregado al carrito:', item.name);
  };

  const handleSearchFocus = () => {
    // Navegar a la pantalla de búsqueda cuando se toca el SearchBar
    router.push('/search' as any);
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <FoodCard
      item={item}
      onPress={() => handleFoodItemPress(item)}
      onAddToCart={handleAddToCart}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={handleSearchFocus}
        placeholder="¿Qué querés pedir hoy?"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categorySections.map((section) => (
          <View key={section.id} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{section.title}</Text>

            <FlatList
              data={section.items}
              renderItem={renderFoodItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
