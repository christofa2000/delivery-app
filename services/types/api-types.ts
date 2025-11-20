/**
 * Tipos de datos para items de comida
 */
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  restaurant: string;
  deliveryTime: string;
  category: string;
  image?: string;
  rating?: number;
  description?: string;
}

/**
 * Categorías de comida disponibles
 */
export type FoodCategory = 
  | 'popular'
  | 'hamburguesas'
  | 'sushi'
  | 'peruana'
  | 'vegetariano'
  | 'pizzas'
  | 'pastas';

/**
 * Información de una sección de categoría
 */
export interface CategorySection {
  id: string;
  title: string;
  category: FoodCategory;
  items: FoodItem[];
}

/**
 * Item del carrito con cantidad
 */
export interface CartItem extends FoodItem {
  quantity: number;
}
