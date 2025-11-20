import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const Account: FC = () => {
  const handleLogin = () => {
    // TODO: Implementar flujo de login
    console.log('Iniciar sesión');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={100} color="#e91e63" />
      </View>

      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>
        Iniciá sesión para acceder a tu cuenta y realizar pedidos
      </Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleLogin} activeOpacity={0.8}>
        <Text style={styles.registerButtonText}>Crear cuenta nueva</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

