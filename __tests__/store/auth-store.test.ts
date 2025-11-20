import { act, renderHook } from '@testing-library/react-native';
import { useAuthStore, User } from '@/services/store/auth-store';
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

describe('Auth Store', () => {
  const mockUser: User = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // Limpiar el store antes de cada test directamente sin renderHook
    await useAuthStore.getState().logout();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('login', () => {
    it('debe hacer login válido y establecer user + isAuthenticated = true', async () => {
      const { result } = renderHook(() => useAuthStore());

      const loginPromise = act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      // Avanzar los timers para completar el setTimeout
      jest.advanceTimersByTime(1000);

      await loginPromise;

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toBeTruthy();
      expect(result.current.user?.email).toBe('test@example.com');
      expect(storage.setItem).toHaveBeenCalled();
    });

    it('debe tirar error si el email es inválido', async () => {
      const { result } = renderHook(() => useAuthStore());

      const loginPromise = act(async () => {
        await expect(
          result.current.login('invalid-email', 'password123')
        ).rejects.toThrow('Email inválido');
      });

      jest.advanceTimersByTime(1000);
      await loginPromise;

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });

    it('debe tirar error si el email no contiene @', async () => {
      const { result } = renderHook(() => useAuthStore());

      const loginPromise = act(async () => {
        await expect(
          result.current.login('no-at-sign', 'password123')
        ).rejects.toThrow('Email inválido');
      });

      jest.advanceTimersByTime(1000);
      await loginPromise;

      expect(result.current.isAuthenticated).toBe(false);
    });

    it('debe tirar error si la contraseña tiene menos de 6 caracteres', async () => {
      const { result } = renderHook(() => useAuthStore());

      const loginPromise = act(async () => {
        await expect(
          result.current.login('test@example.com', '12345')
        ).rejects.toThrow('La contraseña debe tener al menos 6 caracteres');
      });

      jest.advanceTimersByTime(1000);
      await loginPromise;

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });

    it('debe tirar error si la contraseña está vacía', async () => {
      const { result } = renderHook(() => useAuthStore());

      const loginPromise = act(async () => {
        await expect(
          result.current.login('test@example.com', '')
        ).rejects.toThrow('La contraseña debe tener al menos 6 caracteres');
      });

      jest.advanceTimersByTime(1000);
      await loginPromise;

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('logout', () => {
    it('debe limpiar user y establecer isAuthenticated = false', async () => {
      const { result } = renderHook(() => useAuthStore());

      // Primero hacer login
      const loginPromise = act(async () => {
        await result.current.login('test@example.com', 'password123');
      });
      jest.advanceTimersByTime(1000);
      await loginPromise;

      expect(result.current.isAuthenticated).toBe(true);

      // Luego hacer logout
      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(storage.removeItem).toHaveBeenCalledWith('@delivery_app:user');
    });
  });

  describe('loadUser', () => {
    it('debe cargar datos mockeados desde AsyncStorage', async () => {
      (storage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockUser)
      );

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.loadUser();
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoaded).toBe(true);
      expect(storage.getItem).toHaveBeenCalledWith('@delivery_app:user');
    });

    it('debe establecer isLoaded = true incluso si no hay usuario guardado', async () => {
      (storage.getItem as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.loadUser();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoaded).toBe(true);
    });

    it('debe manejar errores al cargar usuario', async () => {
      (storage.getItem as jest.Mock).mockRejectedValue(
        new Error('Storage error')
      );

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.loadUser();
      });

      expect(result.current.isLoaded).toBe(true);
      expect(result.current.user).toBeNull();
    });
  });

  describe('setUser', () => {
    it('debe establecer el usuario manualmente', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('debe limpiar el usuario si se pasa null', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setUser(mockUser);
        result.current.setUser(null);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});

