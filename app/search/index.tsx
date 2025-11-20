import React, { FC, useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import SearchBar from '@/components/search-bar';
import FoodCard from '@/components/food-card';
import { useSearch } from '@/services/hooks/use-search';
import { useCartStore } from '@/services/store/cart-store';
import { FoodItem, FoodCategory } from '@/services/types/api-types';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native';

// Categorías disponibles para filtros
const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'hamburguesas', label: 'Hamburguesas' },
  { id: 'sushi', label: 'Sushi' },
  { id: 'peruana', label: 'Peruana' },
  { id: 'vegetariano', label: 'Vegetariano' },
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'pastas', label: 'Pastas' },
];

const Search: FC = () => {
  const params = useLocalSearchParams();
  const initialQuery = (params.query as string) || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');

  const { results, isSearching, hasResults } = useSearch(searchQuery, selectedCategory);
  const { addItem } = useCartStore();

  const handleAddToCart = (item: FoodItem) => {
    addItem(item);
    console.log('Agregado al carrito:', item.name);
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <FoodCard
      item={item}
      onAddToCart={handleAddToCart}
    />
  );

  const renderCategoryFilter = ({ item }: { item: typeof CATEGORIES[0] }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
        onPress={() => setSelectedCategory(item.id as FoodCategory | 'all')}
        activeOpacity={0.7}
      >
        <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextActive]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    if (isSearching) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Buscando...</Text>
        </View>
      );
    }

    if (!searchQuery.trim()) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Buscá lo que querés</Text>
          <Text style={styles.emptySubtitle}>
            Escribí el nombre de un plato, restaurante o categoría
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Sin resultados</Text>
        <Text style={styles.emptySubtitle}>
          No encontramos resultados para "{searchQuery}"
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="¿Qué querés pedir hoy?"
      />

      <View style={styles.filtersContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryFilter}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {hasResults ? (
        <FlatList
          data={results}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

export default Search;

