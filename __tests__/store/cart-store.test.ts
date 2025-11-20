import { act, renderHook } from '@testing-library/react-native';
import { useCartStore } from '@/services/store/cart-store';
import { FoodItem } from '@/services/types/api-types';
import { storage } from '@/services/utils/storage';

// Mock del storage
jest.mock('@/services/utils/storage', () => ({
  storage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
}));

describe('Cart Store', () => {
  // Mock de FoodItem simple
  const mockFoodItem: FoodItem = {
    id: 'test-1',
    name: 'Test Burger',
    price: 1000,
    restaurant: 'Test Restaurant',
    deliveryTime: '20-30 min',
    category: 'hamburguesas',
  };

  const mockFoodItem2: FoodItem = {
    id: 'test-2',
    name: 'Test Pizza',
    price: 1500,
    restaurant: 'Test Restaurant 2',
    deliveryTime: '25-35 min',
    category: 'pizzas',
  };

  beforeEach(() => {
    // Limpiar el store antes de cada test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
    jest.clearAllMocks();
  });

  describe('addItem', () => {
    it('debe agregar un producto nuevo al carrito', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        ...mockFoodItem,
        quantity: 1,
      });
      expect(storage.setItem).toHaveBeenCalled();
    });

    it('debe incrementar cantidad si el producto ya está en el carrito', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
        result.current.addItem(mockFoodItem);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
      expect(storage.setItem).toHaveBeenCalledTimes(2);
    });

    it('debe agregar múltiples productos diferentes', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
        result.current.addItem(mockFoodItem2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].id).toBe('test-1');
      expect(result.current.items[1].id).toBe('test-2');
    });
  });

  describe('updateQuantity', () => {
    it('debe actualizar la cantidad correctamente', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
        result.current.updateQuantity('test-1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
      expect(storage.setItem).toHaveBeenCalled();
    });

    it('debe eliminar el item si quantity <= 0', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
        result.current.updateQuantity('test-1', 0);
      });

      expect(result.current.items).toHaveLength(0);
      expect(storage.setItem).toHaveBeenCalled();
    });

    it('debe eliminar el item si quantity es negativo', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
        result.current.updateQuantity('test-1', -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('removeItem', () => {
    it('debe eliminar un item por id', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
        result.current.addItem(mockFoodItem2);
        result.current.removeItem('test-1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('test-2');
      expect(storage.setItem).toHaveBeenCalled();
    });

    it('no debe hacer nada si el id no existe', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
        result.current.removeItem('non-existent-id');
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('clearCart', () => {
    it('debe limpiar todos los items del carrito', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem);
        result.current.addItem(mockFoodItem2);
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(storage.setItem).toHaveBeenCalledWith(
        '@delivery_app:cart',
        JSON.stringify([])
      );
    });
  });

  describe('getTotal', () => {
    it('debe calcular el total correctamente', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem); // 1000
        result.current.addItem(mockFoodItem2); // 1500
        result.current.updateQuantity('test-1', 2); // 1000 * 2 = 2000
      });

      const total = result.current.getTotal();
      expect(total).toBe(3500); // 2000 + 1500
    });

    it('debe retornar 0 si el carrito está vacío', () => {
      const { result } = renderHook(() => useCartStore());

      const total = result.current.getTotal();
      expect(total).toBe(0);
    });
  });

  describe('getTotalItems', () => {
    it('debe contar bien las cantidades totales', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockFoodItem); // quantity: 1
        result.current.addItem(mockFoodItem); // quantity: 2
        result.current.addItem(mockFoodItem2); // quantity: 1
      });

      const totalItems = result.current.getTotalItems();
      expect(totalItems).toBe(3); // 2 + 1
    });

    it('debe retornar 0 si el carrito está vacío', () => {
      const { result } = renderHook(() => useCartStore());

      const totalItems = result.current.getTotalItems();
      expect(totalItems).toBe(0);
    });
  });
});


