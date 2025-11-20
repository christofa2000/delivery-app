/**
 * Extra opcional para un producto (ej: papas, queso extra, etc.)
 */
export interface FoodExtra {
  id: string;
  name: string;
  price: number;
}

/**
 * Opción de selección para un producto (ej: tamaño, bebida, etc.)
 */
export interface FoodSelectOption {
  id: string;
  name: string;
  values: { id: string; name: string; price?: number }[];
}

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
  isOffer?: boolean;
  discountPercentage?: number;
  originalPrice?: number;
  extras?: FoodExtra[];
  selectOptions?: FoodSelectOption[];
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
 * Item del carrito con cantidad, extras y opciones seleccionadas
 */
export interface CartItem extends FoodItem {
  quantity: number;
  extras?: FoodExtra[];
  selectedOptions?: { optionId: string; valueId: string; name: string; price?: number }[];
  // ID único para identificar items distintos con mismo producto pero diferentes opciones
  cartItemId?: string;
}
