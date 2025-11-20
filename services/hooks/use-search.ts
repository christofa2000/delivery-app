import { useState, useEffect, useMemo } from 'react';
import { FoodItem, FoodCategory } from '../types/api-types';
import { categorySections } from '../constants/mock-data';

/**
 * Hook para búsqueda de productos con debounce y filtros
 */
export const useSearch = (query: string, selectedCategory?: FoodCategory | 'all') => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce del query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Obtener todos los productos de todas las categorías
  const allProducts = useMemo(() => {
    return categorySections.flatMap((section) => section.items);
  }, []);

  // Filtrar productos por query y categoría
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filtrar por categoría
    if (selectedCategory && selectedCategory !== 'all') {
      products = products.filter((item) => item.category === selectedCategory);
    }

    // Filtrar por query (búsqueda)
    if (debouncedQuery.trim()) {
      const searchTerm = debouncedQuery.toLowerCase().trim();
      products = products.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.restaurant.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm)
      );
    }

    return products;
  }, [allProducts, debouncedQuery, selectedCategory]);

  return {
    results: filteredProducts,
    isSearching: query !== debouncedQuery,
    hasResults: filteredProducts.length > 0,
  };
};



