import React, { FC, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/services/store/auth-store';
import { styles } from './styles';

const Account: FC = () => {
  const { user, isAuthenticated, logout, loadUser, isLoaded } = useAuthStore();

  // Cargar usuario al montar el componente
  useEffect(() => {
    if (!isLoaded) {
      loadUser();
    }
  }, [isLoaded, loadUser]);

  const handleLogin = () => {
    router.push('/(auth)/login' as any);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que querés cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
            Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
          },
        },
      ]
    );
  };

  const handlePlaceholderAction = (action: string) => {
    Alert.alert(
      action,
      'Esta funcionalidad estará disponible próximamente',
      [{ text: 'Entendido' }]
    );
  };

  // Estado de invitado (no autenticado)
  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={100} color={styles.icon.color} />
        </View>

        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          Iniciá sesión para acceder a tu cuenta y realizar pedidos
        </Text>

        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Ionicons name="receipt-outline" size={24} color={styles.benefitIcon.color} />
            <Text style={styles.benefitText}>Historial de pedidos</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="heart-outline" size={24} color={styles.benefitIcon.color} />
            <Text style={styles.benefitText}>Favoritos guardados</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="flash-outline" size={24} color={styles.benefitIcon.color} />
            <Text style={styles.benefitText}>Checkout rápido</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
          <Ionicons name="log-in-outline" size={20} color={styles.loginButtonIcon.color} />
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={handleLogin} activeOpacity={0.8}>
          <Ionicons name="person-add-outline" size={20} color={styles.registerButtonIcon.color} />
          <Text style={styles.registerButtonText}>Crear cuenta nueva</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Estado autenticado
  return (
    <ScrollView style={styles.authenticatedContainer} contentContainerStyle={styles.scrollContent}>
      {/* Header con info del usuario */}
      <View style={styles.userHeader}>
        <View style={styles.userIconContainer}>
          <Ionicons name="person-circle" size={80} color={styles.userIcon.color} />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Opciones de cuenta */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => handlePlaceholderAction('Mis pedidos')}
          activeOpacity={0.7}
        >
          <View style={styles.optionIconContainer}>
            <Ionicons name="receipt-outline" size={24} color={styles.optionIcon.color} />
          </View>
          <Text style={styles.optionText}>Mis pedidos</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={styles.chevronIcon.color} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => handlePlaceholderAction('Mis direcciones')}
          activeOpacity={0.7}
        >
          <View style={styles.optionIconContainer}>
            <Ionicons name="location-outline" size={24} color={styles.optionIcon.color} />
          </View>
          <Text style={styles.optionText}>Mis direcciones</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={styles.chevronIcon.color} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => handlePlaceholderAction('Métodos de pago')}
          activeOpacity={0.7}
        >
          <View style={styles.optionIconContainer}>
            <Ionicons name="card-outline" size={24} color={styles.optionIcon.color} />
          </View>
          <Text style={styles.optionText}>Métodos de pago</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={styles.chevronIcon.color} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => handlePlaceholderAction('Configuración')}
          activeOpacity={0.7}
        >
          <View style={styles.optionIconContainer}>
            <Ionicons name="settings-outline" size={24} color={styles.optionIcon.color} />
          </View>
          <Text style={styles.optionText}>Configuración</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={styles.chevronIcon.color} />
        </TouchableOpacity>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={20} color={styles.logoutButtonIcon.color} />
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Account;

