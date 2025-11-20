import { create } from 'zustand';
import { storage } from '../utils/storage';
import { CartItem, FoodItem, FoodExtra } from '../types/api-types';

interface AddToCartData {
  extras: FoodExtra[];
  selectedOptions: { optionId: string; valueId: string; name: string; price?: number }[];
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isLoaded: boolean;
  areCartItemsEquivalent: (item1: CartItem, item2: CartItem) => boolean;
  addItem: (item: FoodItem, data?: AddToCartData) => void;
  updateItem: (cartItemId: string, data: AddToCartData) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
  loadCart: () => Promise<void>;
}

/**
 * Generar ID único para un item del carrito basado en producto + extras + opciones
 */
const generateCartItemId = (item: CartItem): string => {
  const extrasIds = (item.extras || []).map((e) => e.id).sort().join(',');
  const optionsStr = (item.selectedOptions || [])
    .map((o) => `${o.optionId}:${o.valueId}`)
    .sort()
    .join(',');
  return `${item.id}_${extrasIds}_${optionsStr}`;
};

const CART_STORAGE_KEY = '@delivery_app:cart';

/**
 * Store global del carrito con persistencia en AsyncStorage
 */
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoaded: false,

  /**
   * Función auxiliar para comparar si dos items del carrito son equivalentes
   * Dos items son equivalentes si tienen el mismo ID, mismos extras y mismas opciones seleccionadas
   */
  areCartItemsEquivalent: (item1: CartItem, item2: CartItem): boolean => {
    if (item1.id !== item2.id) return false;

    // Comparar extras
    const extras1 = item1.extras || [];
    const extras2 = item2.extras || [];
    if (extras1.length !== extras2.length) return false;
    const extras1Ids = extras1.map((e) => e.id).sort().join(',');
    const extras2Ids = extras2.map((e) => e.id).sort().join(',');
    if (extras1Ids !== extras2Ids) return false;

    // Comparar opciones seleccionadas
    const options1 = item1.selectedOptions || [];
    const options2 = item2.selectedOptions || [];
    if (options1.length !== options2.length) return false;
    const options1Str = options1
      .map((o) => `${o.optionId}:${o.valueId}`)
      .sort()
      .join(',');
    const options2Str = options2
      .map((o) => `${o.optionId}:${o.valueId}`)
      .sort()
      .join(',');
    if (options1Str !== options2Str) return false;

    return true;
  },

  /**
   * Agregar un item al carrito
   * Si ya existe con los mismos extras/variantes, incrementa la cantidad
   * Si tiene extras/variantes diferentes, lo agrega como nuevo item
   */
  addItem: (item: FoodItem, data?: AddToCartData) => {
    const currentItems = get().items;
    const extras = data?.extras || (item as any).extras || [];
    const selectedOptions = data?.selectedOptions || (item as any).selectedOptions || [];
    const quantity = data?.quantity || 1;

    const cartItem: CartItem = {
      ...item,
      quantity,
      extras,
      selectedOptions,
    };

    // Generar ID único para este item
    const cartItemId = generateCartItemId(cartItem);
    cartItem.cartItemId = cartItemId;

    // Buscar si existe un item equivalente (mismo ID + mismos extras + mismas opciones)
    const existingItemIndex = currentItems.findIndex((i) =>
      get().areCartItemsEquivalent(i, cartItem)
    );

    let newItems: CartItem[];

    if (existingItemIndex !== -1) {
      // Si ya existe, incrementar cantidad
      newItems = currentItems.map((i, index) =>
        index === existingItemIndex
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
    } else {
      // Si no existe, agregarlo con la cantidad especificada
      newItems = [...currentItems, cartItem];
    }

    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  /**
   * Actualizar un item del carrito (para edición)
   */
  updateItem: (cartItemId: string, data: AddToCartData) => {
    const currentItems = get().items;
    const itemIndex = currentItems.findIndex((i) => i.cartItemId === cartItemId);

    if (itemIndex === -1) return;

    const existingItem = currentItems[itemIndex];
    const updatedItem: CartItem = {
      ...existingItem,
      quantity: data.quantity,
      extras: data.extras,
      selectedOptions: data.selectedOptions,
    };

    // Regenerar cartItemId con los nuevos datos
    updatedItem.cartItemId = generateCartItemId(updatedItem);

    // Verificar si ahora es equivalente a otro item existente
    const equivalentIndex = currentItems.findIndex(
      (i, idx) => idx !== itemIndex && get().areCartItemsEquivalent(i, updatedItem)
    );

    let newItems: CartItem[];

    if (equivalentIndex !== -1) {
      // Si es equivalente a otro item, mergear cantidades y eliminar el actual
      newItems = currentItems.map((i, index) =>
        index === equivalentIndex
          ? { ...i, quantity: i.quantity + data.quantity }
          : i
      ).filter((_, index) => index !== itemIndex);
    } else {
      // Si no es equivalente, actualizar el item
      newItems = currentItems.map((i, index) =>
        index === itemIndex ? updatedItem : i
      );
    }

    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  /**
   * Remover un item del carrito por cartItemId
   */
  removeItem: (cartItemId: string) => {
    const newItems = get().items.filter((item) => item.cartItemId !== cartItemId);
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  /**
   * Actualizar la cantidad de un item por cartItemId
   * Si la cantidad es 0 o menor, se remueve el item
   */
  updateQuantity: (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(cartItemId);
      return;
    }

    const newItems = get().items.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity } : item
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
   * Incluye precio base + extras + opciones seleccionadas
   */
  getTotal: () => {
    return get().items.reduce((total, item) => {
      const basePrice = item.price * item.quantity;
      const beveragesTotal = (item.selectedOptions?.reduce((sum, option) => {
        return sum + ((option.price || 0) * item.quantity);
      }, 0) || 0);
      
      // Sumar extras
      const extrasTotal =
        item.extras?.reduce((sum, extra) => sum + extra.price * item.quantity, 0) || 0;

      return total + basePrice + extrasTotal + beveragesTotal;
    }, 0);
  },

  /**
   * Obtener el número total de items en el carrito
   */
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  /**
   * Cargar el carrito desde storage (localStorage en web, AsyncStorage en mobile)
   * Regenera cartItemId para items que no lo tengan (migración)
   */
  loadCart: async () => {
    try {
      const savedCart = await storage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const items = JSON.parse(savedCart) as CartItem[];
        // Regenerar cartItemId para items que no lo tengan
        const itemsWithIds = items.map((item) => ({
          ...item,
          cartItemId: item.cartItemId || generateCartItemId(item),
        }));
        set({ items: itemsWithIds, isLoaded: true });
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

