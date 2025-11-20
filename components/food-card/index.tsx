import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FoodCardProps } from './types';
import { styles } from './styles';

const FoodCard: FC<FoodCardProps> = ({ item, onPress, onAddToCart }) => {
  const router = useRouter();

  const handleCardPress = () => {
    // Si hay un onPress personalizado, usarlo; sino navegar al detalle
    if (onPress) {
      onPress();
    } else {
      router.push(`/restaurant/${item.id}` as any);
    }
  };

  const handleAddToCart = (e: any) => {
    e?.stopPropagation?.();
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress} activeOpacity={0.8}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="fast-food-outline" size={48} color="#bbb" />
        
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

      {onAddToCart && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle" size={32} color="#e91e63" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default FoodCard;

