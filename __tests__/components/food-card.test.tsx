import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FoodCard from '@/components/food-card';
import { FoodItem } from '@/services/types/api-types';

// Mock de expo-router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('FoodCard', () => {
  const mockFoodItem: FoodItem = {
    id: 'test-1',
    name: 'Test Burger',
    price: 1000,
    restaurant: 'Test Restaurant',
    deliveryTime: '20-30 min',
    category: 'hamburguesas',
    rating: 4.5,
  };

  const mockFoodItemWithOffer: FoodItem = {
    ...mockFoodItem,
    isOffer: true,
    discountPercentage: 20,
    originalPrice: 1250,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('debe renderizar nombre, precio y restaurante', () => {
      const { getByText } = render(<FoodCard item={mockFoodItem} />);

      expect(getByText('Test Burger')).toBeTruthy();
      expect(getByText('$1000')).toBeTruthy();
      expect(getByText('Test Restaurant')).toBeTruthy();
    });

    it('debe renderizar badge de oferta si isOffer === true', () => {
      const { getByText } = render(<FoodCard item={mockFoodItemWithOffer} />);

      expect(getByText('20% OFF')).toBeTruthy();
    });

    it('no debe renderizar badge de oferta si isOffer === false', () => {
      const { queryByText } = render(<FoodCard item={mockFoodItem} />);

      expect(queryByText('20% OFF')).toBeNull();
    });

    it('debe renderizar precio original tachado si hay oferta', () => {
      const { getByText } = render(<FoodCard item={mockFoodItemWithOffer} />);

      expect(getByText('$1250')).toBeTruthy(); // precio original
      expect(getByText('$1000')).toBeTruthy(); // precio con descuento
    });

    it('debe renderizar rating si está disponible', () => {
      const { getByText } = render(<FoodCard item={mockFoodItem} />);

      expect(getByText('4.5')).toBeTruthy();
    });
  });

  describe('navegación', () => {
    it('debe navegar al presionar la card usando expo-router', () => {
      const { UNSAFE_getAllByType } = render(<FoodCard item={mockFoodItem} />);

      const touchables = UNSAFE_getAllByType('TouchableOpacity');
      // El primer TouchableOpacity es la card principal
      fireEvent.press(touchables[0]);

      expect(mockPush).toHaveBeenCalledWith('/restaurant/test-1');
    });

    it('debe usar onPress personalizado si está disponible', () => {
      const mockOnPress = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <FoodCard item={mockFoodItem} onPress={mockOnPress} />
      );

      const touchables = UNSAFE_getAllByType('TouchableOpacity');
      fireEvent.press(touchables[0]);

      expect(mockOnPress).toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('botón agregar al carrito', () => {
    it('debe ejecutar onAddToCart al tocar el botón "+"', () => {
      const mockOnAddToCart = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <FoodCard item={mockFoodItem} onAddToCart={mockOnAddToCart} />
      );

      // Buscar todos los TouchableOpacity (card + botón agregar)
      const touchables = UNSAFE_getAllByType('TouchableOpacity');
      // El último es el botón de agregar
      const addButton = touchables[touchables.length - 1];

      fireEvent.press(addButton);

      expect(mockOnAddToCart).toHaveBeenCalledWith(mockFoodItem);
    });

    it('NO debe navegar al presionar el botón "+"', () => {
      const mockOnAddToCart = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <FoodCard item={mockFoodItem} onAddToCart={mockOnAddToCart} />
      );

      const touchables = UNSAFE_getAllByType('TouchableOpacity');
      const addButton = touchables[touchables.length - 1]; // El último es el botón de agregar

      // Limpiar llamadas previas
      mockPush.mockClear();

      fireEvent.press(addButton);

      expect(mockOnAddToCart).toHaveBeenCalled();
      // Verificar que no se llamó push después de presionar el botón
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('no debe renderizar el botón "+" si onAddToCart no está definido', () => {
      const { UNSAFE_getAllByType } = render(<FoodCard item={mockFoodItem} />);

      // El botón no debería estar presente si no hay onAddToCart
      // Solo debería haber un TouchableOpacity (la card misma)
      const touchables = UNSAFE_getAllByType('TouchableOpacity');
      expect(touchables.length).toBe(1);
    });
  });
});

