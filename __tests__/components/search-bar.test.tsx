import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '@/components/search-bar';

describe('SearchBar', () => {
  const defaultPlaceholder = '¿Qué querés pedir hoy?';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('debe renderizar el input', () => {
      const { getByPlaceholderText } = render(<SearchBar />);

      expect(getByPlaceholderText(defaultPlaceholder)).toBeTruthy();
    });

    it('debe mostrar el placeholder correcto por defecto', () => {
      const { getByPlaceholderText } = render(<SearchBar />);

      expect(getByPlaceholderText(defaultPlaceholder)).toBeTruthy();
    });

    it('debe mostrar el placeholder personalizado si se proporciona', () => {
      const customPlaceholder = 'Buscar productos...';
      const { getByPlaceholderText } = render(
        <SearchBar placeholder={customPlaceholder} />
      );

      expect(getByPlaceholderText(customPlaceholder)).toBeTruthy();
    });

    it('debe mostrar el valor del input si se proporciona', () => {
      const { getByDisplayValue } = render(<SearchBar value="test query" />);

      expect(getByDisplayValue('test query')).toBeTruthy();
    });
  });

  describe('onChangeText', () => {
    it('debe ejecutar onChangeText cuando se escribe en el input', () => {
      const mockOnChangeText = jest.fn();
      const { getByPlaceholderText } = render(
        <SearchBar onChangeText={mockOnChangeText} />
      );

      const input = getByPlaceholderText(defaultPlaceholder);
      fireEvent.changeText(input, 'nueva búsqueda');

      expect(mockOnChangeText).toHaveBeenCalledWith('nueva búsqueda');
    });

    it('debe ejecutar onChangeText múltiples veces', () => {
      const mockOnChangeText = jest.fn();
      const { getByPlaceholderText } = render(
        <SearchBar onChangeText={mockOnChangeText} />
      );

      const input = getByPlaceholderText(defaultPlaceholder);
      fireEvent.changeText(input, 'a');
      fireEvent.changeText(input, 'ab');
      fireEvent.changeText(input, 'abc');

      expect(mockOnChangeText).toHaveBeenCalledTimes(3);
      expect(mockOnChangeText).toHaveBeenLastCalledWith('abc');
    });
  });

  describe('onFocus', () => {
    it('debe ejecutar onFocus cuando el input recibe foco', () => {
      const mockOnFocus = jest.fn();
      const { getByPlaceholderText } = render(
        <SearchBar onFocus={mockOnFocus} />
      );

      const input = getByPlaceholderText(defaultPlaceholder);
      fireEvent(input, 'focus');

      expect(mockOnFocus).toHaveBeenCalled();
    });

    it('no debe ejecutar onFocus si no está definido', () => {
      const { getByPlaceholderText } = render(<SearchBar />);

      const input = getByPlaceholderText(defaultPlaceholder);
      // No debería lanzar error si onFocus no está definido
      expect(() => fireEvent(input, 'focus')).not.toThrow();
    });
  });

  describe('onBlur', () => {
    it('debe ejecutar onBlur cuando el input pierde foco', () => {
      const mockOnBlur = jest.fn();
      const { getByPlaceholderText } = render(
        <SearchBar onBlur={mockOnBlur} />
      );

      const input = getByPlaceholderText(defaultPlaceholder);
      fireEvent(input, 'blur');

      expect(mockOnBlur).toHaveBeenCalled();
    });
  });

  describe('comportamiento integrado', () => {
    it('debe manejar múltiples eventos correctamente', () => {
      const mockOnChangeText = jest.fn();
      const mockOnFocus = jest.fn();
      const mockOnBlur = jest.fn();

      const { getByPlaceholderText } = render(
        <SearchBar
          onChangeText={mockOnChangeText}
          onFocus={mockOnFocus}
          onBlur={mockOnBlur}
        />
      );

      const input = getByPlaceholderText(defaultPlaceholder);

      fireEvent(input, 'focus');
      fireEvent.changeText(input, 'test');
      fireEvent(input, 'blur');

      expect(mockOnFocus).toHaveBeenCalledTimes(1);
      expect(mockOnChangeText).toHaveBeenCalledWith('test');
      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });
  });
});


