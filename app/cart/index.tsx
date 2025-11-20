import AddToCartModal from "@/components/add-to-cart-modal";
import { AddToCartData } from "@/components/add-to-cart-modal/types";
import { colors } from "@/services/constants/theme";
import { useCartStore } from "@/services/store/cart-store";
import { CartItem } from "@/services/types/api-types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { FC, useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "./styles";

const DELIVERY_COST = 400;

const Cart: FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    updateItem,
    clearCart,
    getTotal,
    loadCart,
    isLoaded,
  } = useCartStore();
  const insets = useSafeAreaInsets();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Cargar el carrito al montar el componente
  useEffect(() => {
    if (!isLoaded) {
      loadCart();
    }
  }, [isLoaded, loadCart]);

  const subtotal = getTotal();
  const total = subtotal + DELIVERY_COST;

  const handleClearCart = () => {
    console.log("🔴 [DEBUG] handleClearCart llamado");
    console.log("🔴 [DEBUG] Items actuales:", items.length);
    console.log("🔴 [DEBUG] clearCart función:", typeof clearCart);

    // Detectar si estamos en web
    const isWeb = typeof window !== "undefined" && window.confirm;

    if (isWeb) {
      // Usar window.confirm para web (más confiable)
      const confirmed = window.confirm(
        "¿Estás seguro que querés eliminar todos los productos del carrito?"
      );
      console.log("🔴 [DEBUG] Usuario confirmó:", confirmed);

      if (confirmed) {
        console.log("🔴 [DEBUG] Ejecutando clearCart()...");
        try {
          clearCart();
          console.log("🔴 [DEBUG] clearCart() ejecutado exitosamente");
          // Pequeño delay para que el estado se actualice
          setTimeout(() => {
            console.log("🔴 [DEBUG] Items después de clearCart:", items.length);
            alert("¡Listo! El carrito se vació correctamente");
          }, 100);
        } catch (error) {
          console.error("❌ [ERROR] Error al ejecutar clearCart:", error);
          alert("Error al vaciar el carrito. Por favor, intentá de nuevo.");
        }
      }
    } else {
      // Para mobile, usar Alert nativo
      Alert.alert(
        "Vaciar carrito",
        "¿Estás seguro que querés eliminar todos los productos del carrito?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Vaciar",
            style: "destructive",
            onPress: () => {
              console.log("🔴 [DEBUG] Ejecutando clearCart() desde Alert...");
              clearCart();
              Alert.alert("¡Listo!", "El carrito se vació correctamente");
            },
          },
        ]
      );
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Carrito vacío", "Agregá productos para continuar");
      return;
    }
    // Navegar a la pantalla de checkout
    router.push("/checkout" as any);
  };

  const handleEditItem = (item: CartItem) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const handleModalConfirm = (data: AddToCartData) => {
    if (editingItem && editingItem.cartItemId) {
      updateItem(editingItem.cartItemId, data);
      setEditingItem(null);
      setIsModalVisible(false);
    }
  };

  const handleModalClose = () => {
    setEditingItem(null);
    setIsModalVisible(false);
  };

  // Calcular total de un item individual (precio + extras)
  const getItemTotal = (item: CartItem): number => {
    const basePrice = item.price * item.quantity;
    const extrasTotal =
      item.extras?.reduce(
        (sum, extra) => sum + extra.price * item.quantity,
        0
      ) || 0;
    return basePrice + extrasTotal;
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const itemTotal = getItemTotal(item);

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

          {/* Mostrar extras seleccionados */}
          {item.extras && item.extras.length > 0 && (
            <View style={styles.extrasContainer}>
              {item.extras.map((extra) => (
                <Text key={extra.id} style={styles.extraText}>
                  + {extra.name}
                </Text>
              ))}
            </View>
          )}

          {/* Mostrar bebida seleccionada */}
          {item.selectedOptions && item.selectedOptions.length > 0 && (
            <View style={styles.optionsContainer}>
              {item.selectedOptions.map((option, index) => (
                <Text key={index} style={styles.optionText}>
                  Bebida: {option.name}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.itemPriceRow}>
            <Text style={styles.itemPrice}>${item.price}</Text>
            {item.extras && item.extras.length > 0 && (
              <Text style={styles.extrasPrice}>
                +${item.extras.reduce((sum, e) => sum + e.price, 0)} extras
              </Text>
            )}
          </View>
        </View>

        <View style={styles.itemControls}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                if (item.cartItemId) {
                  updateQuantity(item.cartItemId, item.quantity - 1);
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={20} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                if (item.cartItemId) {
                  updateQuantity(item.cartItemId, item.quantity + 1);
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.itemTotal}>${itemTotal}</Text>

          <View style={styles.itemActions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditItem(item)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                if (item.cartItemId) {
                  removeItem(item.cartItemId);
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
            </TouchableOpacity>
          </View>
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
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.container}>{renderEmptyCart()}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.cartItemId || item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal para editar item */}
        {editingItem && (
          <AddToCartModal
            visible={isModalVisible}
            onClose={handleModalClose}
            foodItem={editingItem}
            onConfirm={handleModalConfirm}
            initialData={{
              extras: editingItem.extras,
              selectedOptions: editingItem.selectedOptions,
              quantity: editingItem.quantity,
            }}
          />
        )}

        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
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
            onPress={() => {
              console.log('🔴 Botón "Vaciar carrito" presionado');
              handleClearCart();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.clearButtonText}>Vaciar carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
