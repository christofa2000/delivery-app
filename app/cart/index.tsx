import React, { FC, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '@/services/store/cart-store';
import { CartItem } from '@/services/types/api-types';
import { styles } from './styles';

const DELIVERY_COST = 400;

const Cart: FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal, loadCart, isLoaded } =
    useCartStore();

  // Cargar el carrito al montar el componente
  useEffect(() => {
    if (!isLoaded) {
      loadCart();
    }
  }, [isLoaded, loadCart]);

  const subtotal = getTotal();
  const total = subtotal + DELIVERY_COST;

  const handleClearCart = () => {
    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro que querés vaciar el carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Vaciar',
          style: 'destructive',
          onPress: () => clearCart(),
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Carrito vacío', 'Agregá productos para continuar');
      return;
    }
    // Navegar a la pantalla de checkout
    router.push('/checkout' as any);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const itemTotal = item.price * item.quantity;

    return (
      <View style={styles.cartItem}>
        <View style={styles.itemImagePlaceholder}>
          <Ionicons name="fast-food-outline" size={32} color="#bbb" />
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.itemRestaurant} numberOfLines={1}>
            {item.restaurant}
          </Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>

        <View style={styles.itemControls}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={20} color="#e91e63" />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={20} color="#e91e63" />
            </TouchableOpacity>
          </View>

          <Text style={styles.itemTotal}>${itemTotal}</Text>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={20} color="#e91e63" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={100} color="#ddd" />
      <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
      <Text style={styles.emptySubtitle}>
        Agregá productos para comenzar tu pedido
      </Text>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        {renderEmptyCart()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={styles.summaryValue}>${DELIVERY_COST}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Ir al checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearCart}
          activeOpacity={0.8}
        >
          <Text style={styles.clearButtonText}>Vaciar carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

