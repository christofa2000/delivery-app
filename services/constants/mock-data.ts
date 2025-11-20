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
    description: 'Nuestra burger clásica con carne 100% vacuna, queso cheddar, lechuga, tomate y cebolla caramelizada. Incluye porción de papas fritas crujientes.',
  },
  {
    id: 'pop-2',
    name: 'Sushi Variado (24 piezas)',
    price: 1450,
    restaurant: 'Sushi Master',
    deliveryTime: '30-40 min',
    category: 'popular',
    rating: 4.9,
    description: 'Selección de 24 piezas de sushi premium: California rolls, Philadelphia rolls, rolls de salmón y atún, más nigiri variado. Incluye salsa de soja, wasabi y jengibre.',
  },
  {
    id: 'pop-3',
    name: 'Pizza Muzzarella Familiar',
    price: 1200,
    restaurant: 'La Napoletana',
    deliveryTime: '20-30 min',
    category: 'popular',
    rating: 4.7,
    description: 'Pizza familiar con salsa de tomate casera y abundante muzzarella de primera calidad. Masa artesanal de 48hs de fermentación. Ideal para compartir.',
  },
  {
    id: 'pop-4',
    name: 'Ceviche de Pescado',
    price: 980,
    restaurant: 'Sabor Peruano',
    deliveryTime: '25-35 min',
    category: 'popular',
    rating: 4.9,
    description: 'Pescado fresco del día marinado en limón, con cebolla morada, cilantro, ají limo y camote. Acompañado de choclo y cancha. Receta tradicional peruana.',
  },
  {
    id: 'pop-5',
    name: 'Tacos al Pastor (4 unidades)',
    price: 750,
    restaurant: 'Taquería México',
    deliveryTime: '15-25 min',
    category: 'popular',
    rating: 4.6,
    description: 'Tacos con carne de cerdo marinada al estilo tradicional mexicano, piña asada, cebolla, cilantro y salsa verde. Tortillas de maíz hechas a mano.',
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
    description: 'Hamburguesa gourmet con doble carne, bacon ahumado crujiente, queso cheddar fundido, cebolla caramelizada y salsa BBQ especial. Incluye papas rústicas.',
  },
  {
    id: 'burg-2',
    name: 'Doble Cheddar XL',
    price: 1100,
    restaurant: 'Burger King',
    deliveryTime: '20-30 min',
    category: 'hamburguesas',
    rating: 4.5,
    description: 'Dos medallones de carne flame-grilled, doble queso cheddar, pepinillos, ketchup y mostaza en pan de sésamo XL. Para los amantes del queso.',
  },
  {
    id: 'burg-3',
    name: 'Chicken Crispy Burger',
    price: 820,
    restaurant: 'Crispy Town',
    deliveryTime: '25-30 min',
    category: 'hamburguesas',
    rating: 4.6,
    description: 'Suprema de pollo crocante empanada, lechuga fresca, tomate, mayonesa casera y queso. Perfecta para los que prefieren pollo.',
  },
  {
    id: 'burg-4',
    name: 'Veggie Mushroom Burger',
    price: 880,
    restaurant: 'Green Burgers',
    deliveryTime: '30-40 min',
    category: 'hamburguesas',
    rating: 4.7,
    description: 'Medallón 100% vegetal a base de hongos portobello, quinoa y legumbres. Con queso vegano, rúcula y tomates secos. Opción saludable y deliciosa.',
  },
  {
    id: 'burg-5',
    name: 'Triple Meat Monster',
    price: 1350,
    restaurant: 'The Burger Lab',
    deliveryTime: '25-35 min',
    category: 'hamburguesas',
    rating: 4.9,
    description: 'Para los más hambrientos: tres medallones de carne premium, triple queso, bacon, cebolla crispy y salsa secreta. Un verdadero desafío. Incluye papas XXL.',
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
    description: 'Combo premium de 30 piezas: California, Philadelphia, rolls de salmón, atún y langostinos, más sashimi y nigiri variado. El combo más completo.',
  },
  {
    id: 'sush-2',
    name: 'California Rolls',
    price: 890,
    restaurant: 'Sakura Sushi',
    deliveryTime: '25-35 min',
    category: 'sushi',
    rating: 4.7,
    description: 'Clásicos rolls California con cangrejo, palta, pepino y sésamo. 10 piezas. Fresco y delicioso, perfecto para iniciarse en el sushi.',
  },
  {
    id: 'sush-3',
    name: 'Sashimi de Salmón',
    price: 1250,
    restaurant: 'Sushi Master',
    deliveryTime: '30-40 min',
    category: 'sushi',
    rating: 4.8,
    description: 'Láminas de salmón rosado premium sin arroz. 12 cortes perfectos. Para los puristas que aprecian el sabor del pescado fresco.',
  },
  {
    id: 'sush-4',
    name: 'Tempura Roll Especial',
    price: 980,
    restaurant: 'Tokyo House',
    deliveryTime: '35-45 min',
    category: 'sushi',
    rating: 4.6,
    description: 'Rolls con langostinos en tempura crujiente, queso crema, palta y salsa teriyaki. Contraste perfecto entre textura crocante y cremosa.',
  },
  {
    id: 'sush-5',
    name: 'Poke Bowl Salmón',
    price: 1150,
    restaurant: 'Sakura Sushi',
    deliveryTime: '25-35 min',
    category: 'sushi',
    rating: 4.8,
    description: 'Bowl hawaiano con arroz de sushi, cubos de salmón fresco, edamame, palta, alga wakame, sésamo y salsa ponzu. Fresco y nutritivo.',
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
    description: 'Tiras de lomo salteado al wok con cebolla, tomate, ají amarillo y sillao. Acompañado de papas fritas y arroz blanco. Plato emblema de la cocina peruana.',
  },
  {
    id: 'peru-2',
    name: 'Ceviche Mixto',
    price: 1050,
    restaurant: 'Cevichería del Mar',
    deliveryTime: '20-30 min',
    category: 'peruana',
    rating: 4.8,
    description: 'Pescado, pulpo, calamares y langostinos marinados en limón con rocoto, cebolla morada y cilantro. Acompañado de camote, choclo y cancha.',
  },
  {
    id: 'peru-3',
    name: 'Ají de Gallina',
    price: 950,
    restaurant: 'Sabor Peruano',
    deliveryTime: '25-35 min',
    category: 'peruana',
    rating: 4.7,
    description: 'Pollo deshilachado en crema de ají amarillo, nueces y queso parmesano. Servido con papas doradas, aceitunas y huevo. Comfort food peruano.',
  },
  {
    id: 'peru-4',
    name: 'Arroz con Mariscos',
    price: 1280,
    restaurant: 'Cevichería del Mar',
    deliveryTime: '30-40 min',
    category: 'peruana',
    rating: 4.8,
    description: 'Arroz cremoso con calamares, langostinos, mejillones y pulpo, cocido en salsa de ají panca y vino blanco. Generosa porción marina.',
  },
  {
    id: 'peru-5',
    name: 'Causa Limeña',
    price: 780,
    restaurant: 'Sabor Peruano',
    deliveryTime: '20-30 min',
    category: 'peruana',
    rating: 4.6,
    description: 'Pastel frío de papa amarilla con limón y ají, relleno de pollo con mayonesa. Decorado con huevo, aceitunas y palta. Entrada tradicional.',
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
    description: 'Bowl completo con quinoa, garbanzos especiados, hummus, vegetales asados, palta, semillas y tahini. 100% plant-based y nutritivo.',
  },
  {
    id: 'veg-2',
    name: 'Ensalada César Veggie',
    price: 780,
    restaurant: 'Salad Bar',
    deliveryTime: '15-25 min',
    category: 'vegetariano',
    rating: 4.7,
    description: 'Lechuga romana, croutons caseros, queso parmesano vegano y aderezo César sin huevo. Fresca, crujiente y deliciosa.',
  },
  {
    id: 'veg-3',
    name: 'Wrap de Falafel',
    price: 850,
    restaurant: 'Green Life',
    deliveryTime: '20-30 min',
    category: 'vegetariano',
    rating: 4.6,
    description: 'Tortilla integral con falafel de garbanzos crocantes, hummus, tabule, pepino, tomate y salsa de yogur vegano. Sabor mediterráneo.',
  },
  {
    id: 'veg-4',
    name: 'Lasagna de Verduras',
    price: 990,
    restaurant: 'Veggie House',
    deliveryTime: '30-40 min',
    category: 'vegetariano',
    rating: 4.7,
    description: 'Capas de pasta con berenjenas, zucchini, espinaca, ricota vegetal y salsa de tomate casera. Gratinada al horno con queso vegano.',
  },
  {
    id: 'veg-5',
    name: 'Quinoa Power Bowl',
    price: 880,
    restaurant: 'Salad Bar',
    deliveryTime: '20-30 min',
    category: 'vegetariano',
    rating: 4.8,
    description: 'Quinoa orgánica, kale, remolacha asada, zanahoria, garbanzos, almendras y vinagreta de mostaza. Súper nutritivo y energizante.',
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
    description: 'Pizza clásica con salsa de tomate, muzzarella, tomates frescos, ajo y albahaca. Masa artesanal a la piedra. Tradición italiana auténtica.',
  },
  {
    id: 'pizza-2',
    name: 'Pizza Cuatro Quesos',
    price: 1280,
    restaurant: 'Don Antonio',
    deliveryTime: '25-35 min',
    category: 'pizzas',
    rating: 4.7,
    description: 'Blend de muzzarella, provolone, fontina y gorgonzola sobre salsa blanca. Para los verdaderos amantes del queso. Cremosa y deliciosa.',
  },
  {
    id: 'pizza-3',
    name: 'Pizza Calabresa',
    price: 1190,
    restaurant: 'La Napoletana',
    deliveryTime: '20-30 min',
    category: 'pizzas',
    rating: 4.8,
    description: 'Muzzarella, rodajas de salame calabrés, aceitunas negras y orégano. Borde relleno disponible. Clásico que nunca falla.',
  },
  {
    id: 'pizza-4',
    name: 'Pizza Vegetariana',
    price: 1100,
    restaurant: 'Veggie Pizza',
    deliveryTime: '25-35 min',
    category: 'pizzas',
    rating: 4.6,
    description: 'Salsa de tomate, muzzarella, morrones asados, cebolla, champiñones, aceitunas y rúcula fresca. Opción veggie sin renunciar al sabor.',
  },
  {
    id: 'pizza-5',
    name: 'Pizza Pepperoni XL',
    price: 1350,
    restaurant: 'Don Antonio',
    deliveryTime: '25-35 min',
    category: 'pizzas',
    rating: 4.9,
    description: 'Pizza extra grande con triple muzzarella y abundante pepperoni. Perfecta para compartir o para los muy hambrientos. 8 porciones generosas.',
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
    description: 'Fetuccini en cremosa salsa Alfredo con queso parmesano, manteca y un toque de nuez moscada. Incluye pan de ajo. Clásico irresistible.',
  },
  {
    id: 'pasta-2',
    name: 'Spaghetti Bolognesa',
    price: 890,
    restaurant: 'Trattoria Italiana',
    deliveryTime: '20-30 min',
    category: 'pastas',
    rating: 4.8,
    description: 'Spaghetti con salsa bolognesa de carne vacuna, tomate, zanahoria, apio y vino tinto. Receta tradicional italiana de cocción lenta.',
  },
  {
    id: 'pasta-3',
    name: 'Ravioles de Ricota',
    price: 1080,
    restaurant: 'Pasta Bella',
    deliveryTime: '25-35 min',
    category: 'pastas',
    rating: 4.9,
    description: 'Ravioles caseros rellenos de ricota y espinaca, con salsa de tomate fresco y albahaca. Espolvoreados con queso rallado. Pasta artesanal.',
  },
  {
    id: 'pasta-4',
    name: 'Lasagna Clásica',
    price: 1150,
    restaurant: 'Trattoria Italiana',
    deliveryTime: '30-40 min',
    category: 'pastas',
    rating: 4.8,
    description: 'Capas de pasta con salsa bolognesa, bechamel y muzzarella, gratinada al horno. Porción generosa, perfecta para compartir o disfrutar solo.',
  },
  {
    id: 'pasta-5',
    name: 'Pasta Carbonara',
    price: 980,
    restaurant: 'Pasta Bella',
    deliveryTime: '25-35 min',
    category: 'pastas',
    rating: 4.7,
    description: 'Spaghetti con panceta crocante, yema de huevo, queso parmesano y pimienta negra. Cremosa sin usar crema. Receta romana auténtica.',
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

