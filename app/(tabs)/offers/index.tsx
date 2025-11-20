import React, { FC, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FoodCard from '@/components/food-card';
import { categorySections } from '@/services/constants/mock-data';
import { useCartStore } from '@/services/store/cart-store';
import { FoodItem } from '@/services/types/api-types';
import { styles } from './styles';

const Offers: FC = () => {
  const { addItem } = useCartStore();

  // Filtrar solo productos en oferta
  const offerItems = useMemo(() => {
    const allItems: FoodItem[] = [];
    
    for (const section of categorySections) {
      const offers = section.items.filter((item) => item.isOffer === true);
      allItems.push(...offers);
    }
    
    return allItems;
  }, []);

  const handleAddToCart = (item: FoodItem) => {
    addItem(item);
    console.log('Agregado al carrito:', item.name);
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.cardWrapper}>
      <FoodCard
        item={item}
        onAddToCart={handleAddToCart}
      />
    </View>
  );

  // Si no hay ofertas
  if (offerItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="pricetag-outline" size={80} color="#ddd" />
        <Text style={styles.emptyTitle}>Sin ofertas por ahora</Text>
        <Text style={styles.emptySubtitle}>
          Hoy no hay ofertas, pero pronto volverán 😄
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ofertas especiales</Text>
        <Text style={styles.subtitle}>Aprovechá los descuentos de hoy</Text>
        <View style={styles.offerBadge}>
          <Ionicons name="flame" size={18} color="#fff" />
          <Text style={styles.offerBadgeText}>{offerItems.length} ofertas disponibles</Text>
        </View>
      </View>

      {/* Lista de ofertas */}
      <FlatList
        data={offerItems}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Offers;
