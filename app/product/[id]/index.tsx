import React, { FC, useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFoodItemById } from '@/services/utils/get-food-item';
import { useCartStore } from '@/services/store/cart-store';
import { FoodExtra } from '@/services/types/api-types';
import { colors, spacing, radii, typography } from '@/services/constants/theme';
import { styles } from './styles';

const ProductDetail: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { optionId: string; valueId: string; name: string; price?: number }>>({});
  const [quantity, setQuantity] = useState(1);
  const [beverageErrors, setBeverageErrors] = useState<Record<string, boolean>>({});
  const { addItem } = useCartStore();
  const insets = useSafeAreaInsets();

  // Buscar el producto por ID
  const foodItem = id ? getFoodItemById(id) : null;

  // Manejar caso de producto no encontrado
  if (!foodItem) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={80} color={colors.primary} />
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

  // Toggle extra seleccionado
  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  // Seleccionar opción (bebida)
  const selectOption = (optionId: string, valueId: string, name: string, price?: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: { optionId, valueId, name, price },
    }));
    // Limpiar error de esta opción
    setBeverageErrors((prev) => ({
      ...prev,
      [optionId]: false,
    }));
  };

  // Calcular precio total
  const totalPrice = useMemo(() => {
    const basePrice = foodItem.price;
    const selectedExtrasData = foodItem.extras?.filter((e) =>
      selectedExtras.includes(e.id)
    ) || [];
    const extrasTotal = selectedExtrasData.reduce((sum, extra) => sum + extra.price, 0);
    
    // Sumar precios de bebidas seleccionadas
    const beveragesTotal = Object.values(selectedOptions).reduce((sum, option) => {
      return sum + (option.price || 0);
    }, 0);
    
    return (basePrice + extrasTotal + beveragesTotal) * quantity;
  }, [foodItem.price, foodItem.extras, selectedExtras, selectedOptions, quantity]);

  // Obtener extras seleccionados como FoodExtra[]
  const getSelectedExtrasData = (): FoodExtra[] => {
    if (!foodItem.extras) return [];
    return foodItem.extras.filter((extra) => selectedExtras.includes(extra.id));
  };

  // Manejar agregar al carrito
  const handleAddToCart = () => {
    // Validar que todas las selectOptions obligatorias estén seleccionadas
    if (foodItem.selectOptions && foodItem.selectOptions.length > 0) {
      const errors: Record<string, boolean> = {};
      let hasError = false;

      foodItem.selectOptions.forEach((option) => {
        if (!selectedOptions[option.id]) {
          errors[option.id] = true;
          hasError = true;
        }
      });

      if (hasError) {
        setBeverageErrors(errors);
        return;
      }
    }

    // Preparar datos
    const extras = getSelectedExtrasData();
    const selectedOptionsArray = Object.values(selectedOptions);

    // Agregar al carrito
    addItem(foodItem, {
      extras,
      selectedOptions: selectedOptionsArray,
      quantity,
    });

    // Navegar al carrito
    router.push('/cart' as any);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

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
              <Ionicons name="restaurant-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.restaurant}>{foodItem.restaurant}</Text>
            </View>

            {/* Tiempo de entrega */}
            <View style={styles.deliveryRow}>
              <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.deliveryTime}>{foodItem.deliveryTime}</Text>
            </View>

            {/* Precio base */}
            <Text style={styles.price}>${foodItem.price}</Text>

            {/* Descripción */}
            {foodItem.description && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Descripción</Text>
                <Text style={styles.description}>{foodItem.description}</Text>
              </View>
            )}

            {/* Sección de Extras */}
            {foodItem.extras && foodItem.extras.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Extras</Text>
                {foodItem.extras.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.id);
                  return (
                    <TouchableOpacity
                      key={extra.id}
                      style={[
                        styles.extraItem,
                        isSelected && styles.extraItemSelected,
                      ]}
                      onPress={() => toggleExtra(extra.id)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.extraCheckbox,
                          isSelected && styles.extraCheckboxSelected,
                        ]}
                      >
                        {isSelected && (
                          <Ionicons name="checkmark" size={16} color={colors.background} />
                        )}
                      </View>
                      <View style={styles.extraContent}>
                        <Text style={styles.extraName}>{extra.name}</Text>
                        <Text style={styles.extraPrice}>
                          {extra.price === 0 ? 'Gratis' : `+$${extra.price}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* Sección de Bebidas */}
            {foodItem.selectOptions && foodItem.selectOptions.length > 0 && (
              <>
                {foodItem.selectOptions.map((option) => {
                  const selectedValue = selectedOptions[option.id];
                  const hasError = beverageErrors[option.id];
                  return (
                    <View key={option.id} style={styles.section}>
                      <Text style={styles.sectionTitle}>{option.name}</Text>
                      {option.values.map((value) => {
                        const isSelected = selectedValue?.valueId === value.id;
                        return (
                          <TouchableOpacity
                            key={value.id}
                            style={[
                              styles.optionItem,
                              isSelected && styles.optionItemSelected,
                            ]}
                            onPress={() => selectOption(option.id, value.id, value.name, value.price)}
                            activeOpacity={0.7}
                          >
                            <View
                              style={[
                                styles.optionRadio,
                                isSelected && styles.optionRadioSelected,
                              ]}
                            >
                              {isSelected && <View style={styles.optionRadioInner} />}
                            </View>
                            <View style={styles.optionContent}>
                              <Text style={styles.optionName}>{value.name}</Text>
                              {value.price !== undefined && (
                                <Text style={styles.optionPrice}>
                                  {value.price === 0 ? 'Gratis' : `+$${value.price}`}
                                </Text>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                      {hasError && (
                        <Text style={styles.errorText}>
                          Por favor, elegí una {option.name.toLowerCase()}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </>
            )}

            {/* Controles de cantidad */}
            <View style={styles.quantitySection}>
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
                    color={quantity <= 1 ? colors.muted : colors.primary}
                  />
                </TouchableOpacity>

                <Text style={styles.quantityValue}>{quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={handleIncreaseQuantity}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Precio total */}
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalPrice}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer con botón */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="cart" size={24} color={colors.background} />
            <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

