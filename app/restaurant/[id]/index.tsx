import React, { FC, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFoodItemById } from '@/services/utils/get-food-item';
import { useCartStore } from '@/services/store/cart-store';
import { styles } from './styles';

const RestaurantDetail: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const insets = useSafeAreaInsets();

  // Buscar el producto por ID
  const foodItem = id ? getFoodItemById(id) : null;

  // Manejar caso de producto no encontrado
  if (!foodItem) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={80} color="#e91e63" />
          <Text style={styles.errorTitle}>Producto no encontrado</Text>
          <Text style={styles.errorSubtitle}>
            No pudimos encontrar el producto que buscás
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
            <Text style={styles.backButtonText}>Volver atrás</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < quantity; i++) {
      addItem(foodItem);
    }

    Alert.alert(
      '¡Agregado al carrito!',
      `${quantity} x ${foodItem.name} agregado correctamente`,
      [
        { text: 'Seguir comprando', style: 'cancel' },
        {
          text: 'Ir al carrito',
          onPress: () => router.push('/cart' as any),
        },
      ]
    );
  };

  const subtotal = foodItem.price * quantity;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Imagen del producto */}
        <View style={styles.imageContainer}>
          {foodItem.image ? (
            <Image 
              source={{ uri: foodItem.image }} 
              style={styles.productImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="fast-food" size={120} color="#bbb" />
            </View>
          )}
          {foodItem.rating && (
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={18} color="#FFB800" />
              <Text style={styles.ratingText}>{foodItem.rating}</Text>
            </View>
          )}
        </View>

        {/* Información del producto */}
        <View style={styles.infoContainer}>
          {/* Categoría */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {foodItem.category === 'popular'
                ? 'Lo más pedido'
                : foodItem.category.charAt(0).toUpperCase() + foodItem.category.slice(1)}
            </Text>
          </View>

          {/* Nombre del plato */}
          <Text style={styles.name}>{foodItem.name}</Text>

          {/* Restaurante */}
          <View style={styles.restaurantRow}>
            <Ionicons name="restaurant-outline" size={20} color="#666" />
            <Text style={styles.restaurant}>{foodItem.restaurant}</Text>
          </View>

          {/* Tiempo de entrega */}
          <View style={styles.deliveryRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.deliveryTime}>{foodItem.deliveryTime}</Text>
          </View>

          {/* Precio */}
          <Text style={styles.price}>${foodItem.price}</Text>

          {/* Descripción */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descripción</Text>
            <Text style={styles.description}>
              {foodItem.description || 'Delicioso plato preparado con ingredientes frescos y de calidad.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer con controles y botón */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        {/* Controles de cantidad */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Cantidad</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecreaseQuantity}
              activeOpacity={0.7}
              disabled={quantity <= 1}
            >
              <Ionicons
                name="remove"
                size={24}
                color={quantity <= 1 ? '#ccc' : '#e91e63'}
              />
            </TouchableOpacity>

            <Text style={styles.quantityValue}>{quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncreaseQuantity}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color="#e91e63" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Subtotal */}
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>${subtotal}</Text>
        </View>

        {/* Botón agregar al carrito */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Ionicons name="cart" size={24} color="#fff" />
          <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default RestaurantDetail;

