import React, { FC, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '@/services/store/cart-store';
import { styles } from './styles';

const DELIVERY_COST = 400;
const MOCK_ADDRESS = 'Av. Siempre Viva 742, CABA';

type PaymentMethod = 'efectivo' | 'tarjeta' | 'mercadopago';

const PAYMENT_METHODS = [
  { id: 'efectivo' as PaymentMethod, label: 'Efectivo', icon: 'cash-outline' },
  { id: 'tarjeta' as PaymentMethod, label: 'Tarjeta', icon: 'card-outline' },
  { id: 'mercadopago' as PaymentMethod, label: 'Mercado Pago', icon: 'wallet-outline' },
];

const Checkout: FC = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('efectivo');

  const subtotal = getTotal();
  const total = subtotal + DELIVERY_COST;

  const handleConfirmOrder = () => {
    Alert.alert(
      '¡Tu pedido fue confirmado!',
      `Total: $${total}\nMétodo de pago: ${PAYMENT_METHODS.find((m) => m.id === selectedPayment)?.label}\n\nTu pedido llegará en 25-35 minutos aproximadamente.`,
      [
        {
          text: 'Ver mis pedidos',
          style: 'default',
          onPress: () => {
            clearCart();
            router.replace('/(tabs)' as any);
          },
        },
        {
          text: 'Volver al inicio',
          onPress: () => {
            clearCart();
            router.replace('/(tabs)' as any);
          },
        },
      ]
    );
  };

  const handleBackToCart = () => {
    router.back();
  };

  // Si no hay items, redirigir
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="basket-outline" size={80} color="#ddd" />
        <Text style={styles.emptyTitle}>No hay productos para confirmar</Text>
        <Text style={styles.emptySubtitle}>
          Agregá productos a tu carrito para continuar
        </Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => router.replace('/(tabs)' as any)}
          activeOpacity={0.8}
        >
          <Text style={styles.emptyButtonText}>Ir al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Resumen del pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del pedido</Text>
          
          {items.map((item) => {
            const itemTotal = item.price * item.quantity;
            return (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.orderItemInfo}>
                  <Text style={styles.orderItemQuantity}>{item.quantity}x</Text>
                  <View style={styles.orderItemDetails}>
                    <Text style={styles.orderItemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.orderItemRestaurant} numberOfLines={1}>
                      {item.restaurant}
                    </Text>
                  </View>
                </View>
                <View style={styles.orderItemPricing}>
                  <Text style={styles.orderItemPrice}>${item.price}</Text>
                  <Text style={styles.orderItemTotal}>${itemTotal}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Resumen de costos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de costos</Text>
          
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Subtotal</Text>
            <Text style={styles.costValue}>${subtotal}</Text>
          </View>

          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Envío</Text>
            <Text style={styles.costValue}>${DELIVERY_COST}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.costRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total}</Text>
          </View>
        </View>

        {/* Dirección de entrega */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dirección de entrega</Text>
          
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={24} color="#e91e63" />
            <Text style={styles.addressText}>{MOCK_ADDRESS}</Text>
          </View>

          <TouchableOpacity style={styles.changeButton} activeOpacity={0.7}>
            <Text style={styles.changeButtonText}>Cambiar dirección</Text>
          </TouchableOpacity>
        </View>

        {/* Método de pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de pago</Text>
          
          <View style={styles.paymentMethods}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method.id && styles.paymentMethodActive,
                ]}
                onPress={() => setSelectedPayment(method.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={method.icon as any}
                  size={24}
                  color={selectedPayment === method.id ? '#e91e63' : '#666'}
                />
                <Text
                  style={[
                    styles.paymentMethodText,
                    selectedPayment === method.id && styles.paymentMethodTextActive,
                  ]}
                >
                  {method.label}
                </Text>
                {selectedPayment === method.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#e91e63" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer con botones */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.confirmButtonText}>Confirmar pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>Volver al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkout;


