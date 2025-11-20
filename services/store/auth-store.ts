import { create } from 'zustand';
import { storage } from '../utils/storage';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  loadUser: () => Promise<void>;
}

const AUTH_STORAGE_KEY = '@delivery_app:user';

/**
 * Store global de autenticación con persistencia
 */
export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoaded: false,

  /**
   * Login con email y password (mock)
   * Simula autenticación y crea un usuario falso
   */
  login: async (email: string, password: string) => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validaciones básicas
    if (!email || !email.includes('@')) {
      throw new Error('Email inválido');
    }

    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Crear usuario mock
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
    };

    // Guardar en storage
    await storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));

    // Actualizar estado
    set({
      user: mockUser,
      isAuthenticated: true,
    });
  },

  /**
   * Cerrar sesión
   */
  logout: async () => {
    // Limpiar storage
    await storage.removeItem(AUTH_STORAGE_KEY);

    // Limpiar estado
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  /**
   * Setear usuario manualmente
   */
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: user !== null,
    });
  },

  /**
   * Cargar usuario desde storage al iniciar la app
   */
  loadUser: async () => {
    try {
      const savedUser = await storage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        const user = JSON.parse(savedUser) as User;
        set({
          user,
          isAuthenticated: true,
          isLoaded: true,
        });
      } else {
        set({ isLoaded: true });
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      set({ isLoaded: true });
    }
  },
}));



