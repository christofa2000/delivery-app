import { FoodItem, CategorySection } from '../types/api-types';

/**
 * Datos mock - Lo más pedido
 */
export const popularItems: FoodItem[] = [
  {
    id: 'pop-1',
    name: 'Burger Clásica con Papas',
    price: 890,
    restaurant: 'The Burger Lab',
    deliveryTime: '25-35 min',
    category: 'popular',
    rating: 4.8,
  },
  {
    id: 'pop-2',
    name: 'Sushi Variado (24 piezas)',
    price: 1450,
    restaurant: 'Sushi Master',
    deliveryTime: '30-40 min',
    category: 'popular',
    rating: 4.9,
  },
  {
    id: 'pop-3',
    name: 'Pizza Muzzarella Familiar',
    price: 1200,
    restaurant: 'La Napoletana',
    deliveryTime: '20-30 min',
    category: 'popular',
    rating: 4.7,
  },
  {
    id: 'pop-4',
    name: 'Ceviche de Pescado',
    price: 980,
    restaurant: 'Sabor Peruano',
    deliveryTime: '25-35 min',
    category: 'popular',
    rating: 4.9,
  },
  {
    id: 'pop-5',
    name: 'Tacos al Pastor (4 unidades)',
    price: 750,
    restaurant: 'Taquería México',
    deliveryTime: '15-25 min',
    category: 'popular',
    rating: 4.6,
  },
];

/**
 * Datos mock - Hamburguesas
 */
export const burgersItems: FoodItem[] = [
  {
    id: 'burg-1',
    name: 'Bacon Cheese Burger',
    price: 950,
    restaurant: 'The Burger Lab',
    deliveryTime: '25-35 min',
    category: 'hamburguesas',
    rating: 4.8,
  },
  {
    id: 'burg-2',
    name: 'Doble Cheddar XL',
    price: 1100,
    restaurant: 'Burger King',
    deliveryTime: '20-30 min',
    category: 'hamburguesas',
    rating: 4.5,
  },
  {
    id: 'burg-3',
    name: 'Chicken Crispy Burger',
    price: 820,
    restaurant: 'Crispy Town',
    deliveryTime: '25-30 min',
    category: 'hamburguesas',
    rating: 4.6,
  },
  {
    id: 'burg-4',
    name: 'Veggie Mushroom Burger',
    price: 880,
    restaurant: 'Green Burgers',
    deliveryTime: '30-40 min',
    category: 'hamburguesas',
    rating: 4.7,
  },
  {
    id: 'burg-5',
    name: 'Triple Meat Monster',
    price: 1350,
    restaurant: 'The Burger Lab',
    deliveryTime: '25-35 min',
    category: 'hamburguesas',
    rating: 4.9,
  },
];

/**
 * Datos mock - Sushi
 */
export const sushiItems: FoodItem[] = [
  {
    id: 'sush-1',
    name: 'Sushi Mix (30 piezas)',
    price: 1680,
    restaurant: 'Sushi Master',
    deliveryTime: '30-40 min',
    category: 'sushi',
    rating: 4.9,
  },
  {
    id: 'sush-2',
    name: 'California Rolls',
    price: 890,
    restaurant: 'Sakura Sushi',
    deliveryTime: '25-35 min',
    category: 'sushi',
    rating: 4.7,
  },
  {
    id: 'sush-3',
    name: 'Sashimi de Salmón',
    price: 1250,
    restaurant: 'Sushi Master',
    deliveryTime: '30-40 min',
    category: 'sushi',
    rating: 4.8,
  },
  {
    id: 'sush-4',
    name: 'Tempura Roll Especial',
    price: 980,
    restaurant: 'Tokyo House',
    deliveryTime: '35-45 min',
    category: 'sushi',
    rating: 4.6,
  },
  {
    id: 'sush-5',
    name: 'Poke Bowl Salmón',
    price: 1150,
    restaurant: 'Sakura Sushi',
    deliveryTime: '25-35 min',
    category: 'sushi',
    rating: 4.8,
  },
];

/**
 * Datos mock - Comida Peruana
 */
export const peruanaItems: FoodItem[] = [
  {
    id: 'peru-1',
    name: 'Lomo Saltado',
    price: 1180,
    restaurant: 'Sabor Peruano',
    deliveryTime: '25-35 min',
    category: 'peruana',
    rating: 4.9,
  },
  {
    id: 'peru-2',
    name: 'Ceviche Mixto',
    price: 1050,
    restaurant: 'Cevichería del Mar',
    deliveryTime: '20-30 min',
    category: 'peruana',
    rating: 4.8,
  },
  {
    id: 'peru-3',
    name: 'Ají de Gallina',
    price: 950,
    restaurant: 'Sabor Peruano',
    deliveryTime: '25-35 min',
    category: 'peruana',
    rating: 4.7,
  },
  {
    id: 'peru-4',
    name: 'Arroz con Mariscos',
    price: 1280,
    restaurant: 'Cevichería del Mar',
    deliveryTime: '30-40 min',
    category: 'peruana',
    rating: 4.8,
  },
  {
    id: 'peru-5',
    name: 'Causa Limeña',
    price: 780,
    restaurant: 'Sabor Peruano',
    deliveryTime: '20-30 min',
    category: 'peruana',
    rating: 4.6,
  },
];

/**
 * Datos mock - Comida Vegetariana
 */
export const vegetarianoItems: FoodItem[] = [
  {
    id: 'veg-1',
    name: 'Bowl Vegano Completo',
    price: 920,
    restaurant: 'Green Life',
    deliveryTime: '25-35 min',
    category: 'vegetariano',
    rating: 4.8,
  },
  {
    id: 'veg-2',
    name: 'Ensalada César Veggie',
    price: 780,
    restaurant: 'Salad Bar',
    deliveryTime: '15-25 min',
    category: 'vegetariano',
    rating: 4.7,
  },
  {
    id: 'veg-3',
    name: 'Wrap de Falafel',
    price: 850,
    restaurant: 'Green Life',
    deliveryTime: '20-30 min',
    category: 'vegetariano',
    rating: 4.6,
  },
  {
    id: 'veg-4',
    name: 'Lasagna de Verduras',
    price: 990,
    restaurant: 'Veggie House',
    deliveryTime: '30-40 min',
    category: 'vegetariano',
    rating: 4.7,
  },
  {
    id: 'veg-5',
    name: 'Quinoa Power Bowl',
    price: 880,
    restaurant: 'Salad Bar',
    deliveryTime: '20-30 min',
    category: 'vegetariano',
    rating: 4.8,
  },
];

/**
 * Datos mock - Pizzas
 */
export const pizzasItems: FoodItem[] = [
  {
    id: 'pizza-1',
    name: 'Pizza Napolitana',
    price: 1150,
    restaurant: 'La Napoletana',
    deliveryTime: '20-30 min',
    category: 'pizzas',
    rating: 4.8,
  },
  {
    id: 'pizza-2',
    name: 'Pizza Cuatro Quesos',
    price: 1280,
    restaurant: 'Don Antonio',
    deliveryTime: '25-35 min',
    category: 'pizzas',
    rating: 4.7,
  },
  {
    id: 'pizza-3',
    name: 'Pizza Calabresa',
    price: 1190,
    restaurant: 'La Napoletana',
    deliveryTime: '20-30 min',
    category: 'pizzas',
    rating: 4.8,
  },
  {
    id: 'pizza-4',
    name: 'Pizza Vegetariana',
    price: 1100,
    restaurant: 'Veggie Pizza',
    deliveryTime: '25-35 min',
    category: 'pizzas',
    rating: 4.6,
  },
  {
    id: 'pizza-5',
    name: 'Pizza Pepperoni XL',
    price: 1350,
    restaurant: 'Don Antonio',
    deliveryTime: '25-35 min',
    category: 'pizzas',
    rating: 4.9,
  },
];

/**
 * Datos mock - Pastas
 */
export const pastasItems: FoodItem[] = [
  {
    id: 'pasta-1',
    name: 'Fetuccini Alfredo',
    price: 950,
    restaurant: 'Pasta Bella',
    deliveryTime: '25-35 min',
    category: 'pastas',
    rating: 4.7,
  },
  {
    id: 'pasta-2',
    name: 'Spaghetti Bolognesa',
    price: 890,
    restaurant: 'Trattoria Italiana',
    deliveryTime: '20-30 min',
    category: 'pastas',
    rating: 4.8,
  },
  {
    id: 'pasta-3',
    name: 'Ravioles de Ricota',
    price: 1080,
    restaurant: 'Pasta Bella',
    deliveryTime: '25-35 min',
    category: 'pastas',
    rating: 4.9,
  },
  {
    id: 'pasta-4',
    name: 'Lasagna Clásica',
    price: 1150,
    restaurant: 'Trattoria Italiana',
    deliveryTime: '30-40 min',
    category: 'pastas',
    rating: 4.8,
  },
  {
    id: 'pasta-5',
    name: 'Pasta Carbonara',
    price: 980,
    restaurant: 'Pasta Bella',
    deliveryTime: '25-35 min',
    category: 'pastas',
    rating: 4.7,
  },
];

/**
 * Todas las secciones de categorías
 */
export const categorySections: CategorySection[] = [
  {
    id: 'section-popular',
    title: 'Lo más pedido',
    category: 'popular',
    items: popularItems,
  },
  {
    id: 'section-hamburguesas',
    title: 'Hamburguesas',
    category: 'hamburguesas',
    items: burgersItems,
  },
  {
    id: 'section-sushi',
    title: 'Sushi',
    category: 'sushi',
    items: sushiItems,
  },
  {
    id: 'section-peruana',
    title: 'Comida Peruana',
    category: 'peruana',
    items: peruanaItems,
  },
  {
    id: 'section-vegetariano',
    title: 'Vegetariano',
    category: 'vegetariano',
    items: vegetarianoItems,
  },
  {
    id: 'section-pizzas',
    title: 'Pizzas',
    category: 'pizzas',
    items: pizzasItems,
  },
  {
    id: 'section-pastas',
    title: 'Pastas',
    category: 'pastas',
    items: pastasItems,
  },
];

