import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '@/services/store/cart-store';
import AddToCartModal from '@/components/add-to-cart-modal';
import { AddToCartData } from '@/components/add-to-cart-modal/types';
import { FoodCardProps } from './types';
import { styles } from './styles';

const FoodCard: FC<FoodCardProps> = ({ item, onPress, onAddToCart }) => {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardPress = () => {
    // Si hay un onPress personalizado, usarlo; sino navegar al detalle del producto
    if (onPress) {
      onPress();
    } else {
      router.push(`/product/${item.id}` as any);
    }
  };

  const handleAddToCartClick = (e: any) => {
    e?.stopPropagation?.();
    
    // Si el producto tiene extras u opciones, abrir modal
    if (item.extras || item.selectOptions) {
      setIsModalVisible(true);
    } else if (onAddToCart) {
      // Si no tiene extras/opciones y hay callback personalizado, usarlo
      onAddToCart(item);
    } else {
      // Si no tiene extras/opciones, agregar directamente
      addItem(item);
    }
  };

  const handleModalConfirm = (data: AddToCartData) => {
    addItem(item, data);
    setIsModalVisible(false);
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="fast-food-outline" size={48} color="#bbb" />
          </View>
        )}
        
        {/* Badge de oferta */}
        {item.isOffer && item.discountPercentage && (
          <View style={styles.offerBadge}>
            <Text style={styles.offerBadgeText}>{item.discountPercentage}% OFF</Text>
          </View>
        )}
        
        {/* Rating */}
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFB800" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        
        {/* Precio con oferta */}
        {item.isOffer && item.originalPrice ? (
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>${item.originalPrice}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        ) : (
          <Text style={styles.price}>${item.price}</Text>
        )}
        
        <Text style={styles.restaurant} numberOfLines={1}>
          {item.restaurant}
        </Text>
        <View style={styles.deliveryTimeContainer}>
          <Ionicons name="time-outline" size={16} color="#999" />
          <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
        </View>
      </View>

      {(onAddToCart || true) && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCartClick}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Modal para productos con extras/opciones */}
      {(item.extras || item.selectOptions) && (
        <AddToCartModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          foodItem={item}
          onConfirm={handleModalConfirm}
        />
      )}
    </TouchableOpacity>
  );
};

export default FoodCard;

