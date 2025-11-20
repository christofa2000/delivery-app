import { FoodItem } from '../types/api-types';
import { categorySections } from '../constants/mock-data';

/**
 * Obtener un producto por su ID desde todos los datos mock
 */
export const getFoodItemById = (id: string): FoodItem | null => {
  // Buscar en todas las secciones de categorías
  for (const section of categorySections) {
    const foundItem = section.items.find((item) => item.id === id);
    if (foundItem) {
      return foundItem;
    }
  }
  return null;
};

/**
 * Obtener todos los productos de un restaurante
 */
export const getItemsByRestaurant = (restaurantName: string): FoodItem[] => {
  const allItems: FoodItem[] = [];
  
  for (const section of categorySections) {
    const restaurantItems = section.items.filter(
      (item) => item.restaurant === restaurantName
    );
    allItems.push(...restaurantItems);
  }
  
  return allItems;
};



