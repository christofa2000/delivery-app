import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage wrapper que funciona en web y mobile
 * Usa localStorage en web y AsyncStorage en mobile
 */
class Storage {
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        // En web, usar localStorage
        return localStorage.getItem(key);
      } else {
        // En mobile, usar AsyncStorage
        return await AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.error('Error al obtener item del storage:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // En web, usar localStorage
        localStorage.setItem(key, value);
      } else {
        // En mobile, usar AsyncStorage
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Error al guardar item en storage:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // En web, usar localStorage
        localStorage.removeItem(key);
      } else {
        // En mobile, usar AsyncStorage
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error al eliminar item del storage:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // En web, usar localStorage
        localStorage.clear();
      } else {
        // En mobile, usar AsyncStorage
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.error('Error al limpiar storage:', error);
    }
  }
}

export const storage = new Storage();



