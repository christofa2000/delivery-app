import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodCardProps } from './types';
import { styles } from './styles';

const FoodCard: FC<FoodCardProps> = ({ item, onPress, onAddToCart }) => {
  const handleAddToCart = (e: any) => {
    e?.stopPropagation?.();
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="fast-food-outline" size={48} color="#bbb" />
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
        <Text style={styles.price}>${item.price}</Text>
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

