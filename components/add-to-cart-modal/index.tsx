import React, { FC, useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FoodExtra, FoodSelectOption } from '@/services/types/api-types';
import { colors, spacing } from '@/services/constants/theme';
import { AddToCartModalProps, AddToCartData } from './types';
import { styles } from './styles';

const AddToCartModal: FC<AddToCartModalProps> = ({
  visible,
  onClose,
  foodItem,
  onConfirm,
  initialData,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Inicializar con datos previos si existen (para edición)
  useEffect(() => {
    if (initialData) {
      setSelectedExtras(initialData.extras?.map((e) => e.id) || []);
      const optionsMap: Record<string, string> = {};
      initialData.selectedOptions?.forEach((opt) => {
        optionsMap[opt.optionId] = opt.valueId;
      });
      setSelectedOptions(optionsMap);
      setQuantity(initialData.quantity || 1);
    } else {
      // Resetear al abrir sin datos iniciales
      setSelectedExtras([]);
      setSelectedOptions({});
      setQuantity(1);
      setError(null);
    }
  }, [visible, initialData]);

  // Toggle extra seleccionado
  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
    setError(null);
  };

  // Seleccionar opción (radio button)
  const selectOption = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: valueId,
    }));
    setError(null);
  };

  // Calcular precio total
  const priceBreakdown = useMemo(() => {
    const basePrice = foodItem.price;
    
    // Sumar extras seleccionados
    const selectedExtrasData = foodItem.extras?.filter((e) =>
      selectedExtras.includes(e.id)
    ) || [];
    const extrasTotal = selectedExtrasData.reduce((sum, extra) => sum + extra.price, 0);

    // Precio por unidad
    const unitPrice = basePrice + extrasTotal;
    
    // Total con cantidad
    const total = unitPrice * quantity;

    return {
      basePrice,
      extrasTotal,
      unitPrice,
      total,
      selectedExtrasData,
    };
  }, [foodItem.price, foodItem.extras, selectedExtras, quantity]);

  // Obtener opciones seleccionadas con nombres
  const getSelectedOptionsData = (): { optionId: string; valueId: string; name: string }[] => {
    if (!foodItem.selectOptions) return [];

    return Object.entries(selectedOptions).map(([optionId, valueId]) => {
      const option = foodItem.selectOptions!.find((opt) => opt.id === optionId);
      const value = option?.values.find((v) => v.id === valueId);
      return {
        optionId,
        valueId,
        name: value?.name || '',
      };
    });
  };

  // Validar y confirmar
  const handleConfirm = () => {
    // Validar que si hay selectOptions, se haya seleccionado al menos una opción
    if (foodItem.selectOptions && foodItem.selectOptions.length > 0) {
      const hasSelectedOption = foodItem.selectOptions.some(
        (option) => selectedOptions[option.id]
      );
      
      if (!hasSelectedOption) {
        setError('Por favor, elegí una bebida');
        return;
      }
    }

    const data: AddToCartData = {
      extras: priceBreakdown.selectedExtrasData,
      selectedOptions: getSelectedOptionsData(),
      quantity,
    };

    onConfirm(data);
    onClose();
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
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                { paddingBottom: insets.bottom + spacing.lg },
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <Text style={styles.productName}>{foodItem.name}</Text>
                  <Text style={styles.productPrice}>${foodItem.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: spacing.md }}
              >
                {/* Sección de Extras */}
                {foodItem.extras && foodItem.extras.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Agregá extras</Text>
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

                {/* Sección de Opciones (Bebidas) */}
                {foodItem.selectOptions && foodItem.selectOptions.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bebida</Text>
                    {foodItem.selectOptions.map((option) => (
                      <View key={option.id}>
                        {option.values.map((value) => {
                          const isSelected = selectedOptions[option.id] === value.id;
                          return (
                            <TouchableOpacity
                              key={value.id}
                              style={[
                                styles.optionItem,
                                isSelected && styles.optionItemSelected,
                              ]}
                              onPress={() => selectOption(option.id, value.id)}
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
                              <Text style={styles.optionName}>{value.name}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                    {error && <Text style={styles.errorText}>{error}</Text>}
                  </View>
                )}

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
                        size={20}
                        color={quantity <= 1 ? colors.muted : colors.primary}
                      />
                    </TouchableOpacity>

                    <Text style={styles.quantityValue}>{quantity}</Text>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={handleIncreaseQuantity}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="add" size={20} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Desglose de precio */}
                <View style={styles.priceBreakdown}>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Precio base</Text>
                    <Text style={styles.priceValue}>${foodItem.price}</Text>
                  </View>
                  {priceBreakdown.extrasTotal > 0 && (
                    <View style={styles.priceRow}>
                      <Text style={styles.priceLabel}>Extras</Text>
                      <Text style={styles.priceValue}>+${priceBreakdown.extrasTotal}</Text>
                    </View>
                  )}
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Cantidad</Text>
                    <Text style={styles.priceValue}>{quantity}</Text>
                  </View>
                  <View style={styles.priceTotalRow}>
                    <Text style={styles.priceTotalLabel}>Total</Text>
                    <Text style={styles.priceTotalValue}>${priceBreakdown.total}</Text>
                  </View>
                </View>
              </ScrollView>

              {/* Botón confirmar */}
              <View style={{ paddingHorizontal: spacing.xl }}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                  activeOpacity={0.8}
                >
                  <Ionicons name="cart" size={24} color={colors.background} />
                  <Text style={styles.confirmButtonText}>Agregar a tu orden</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddToCartModal;

