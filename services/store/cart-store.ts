import { create } from 'zustand';
import { storage } from '../utils/storage';
import { CartItem, FoodItem } from '../types/api-types';

interface CartStore {
  items: CartItem[];
  isLoaded: boolean;
  addItem: (item: FoodItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
  loadCart: () => Promise<void>;
}

const CART_STORAGE_KEY = '@delivery_app:cart';

/**
 * Store global del carrito con persistencia en AsyncStorage
 */
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoaded: false,

  /**
   * Agregar un item al carrito
   * Si ya existe, incrementa la cantidad
   */
  addItem: (item: FoodItem) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((i) => i.id === item.id);

    let newItems: CartItem[];

    if (existingItem) {
      // Si ya existe, incrementar cantidad
      newItems = currentItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      // Si no existe, agregarlo con cantidad 1
      newItems = [...currentItems, { ...item, quantity: 1 }];
    }

    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  /**
   * Remover un item del carrito
   */
  removeItem: (id: string) => {
    const newItems = get().items.filter((item) => item.id !== id);
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  /**
   * Actualizar la cantidad de un item
   * Si la cantidad es 0 o menor, se remueve el item
   */
  updateQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    const newItems = get().items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  /**
   * Vaciar el carrito completamente
   */
  clearCart: () => {
    console.log('🗑️ clearCart() llamado - items ANTES:', get().items.length);
    const emptyItems: CartItem[] = [];
    set({ items: emptyItems });
    saveCartToStorage(emptyItems);
    console.log('✅ clearCart() ejecutado - items DESPUÉS:', get().items.length);
    console.log('✅ Carrito vaciado correctamente');
  },

  /**
   * Calcular el total del carrito
   */
  getTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  /**
   * Obtener el número total de items en el carrito
   */
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  /**
   * Cargar el carrito desde storage (localStorage en web, AsyncStorage en mobile)
   */
  loadCart: async () => {
    try {
      const savedCart = await storage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const items = JSON.parse(savedCart) as CartItem[];
        set({ items, isLoaded: true });
      } else {
        set({ isLoaded: true });
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      set({ isLoaded: true });
    }
  },
}));

/**
 * Guardar el carrito en storage (localStorage en web, AsyncStorage en mobile)
 */
const saveCartToStorage = async (items: CartItem[]) => {
  try {
    await storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error al guardar el carrito:', error);
  }
};

