import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/services/store/auth-store';
import { styles } from './styles';

// Esquema de validación con Yup
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setGeneralError(null);
      await login(values.email, values.password);
      
      // Redirigir a tabs después del login exitoso
      router.replace('/(tabs)' as any);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      setGeneralError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };

  const handleCreateAccount = () => {
    Alert.alert(
      'Crear cuenta',
      'La funcionalidad de registro estará disponible próximamente',
      [{ text: 'Entendido' }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 16 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="fast-food" size={60} color="#e91e63" />
          </View>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Text style={styles.subtitle}>
            Ingresá con tu cuenta para realizar pedidos
          </Text>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              {/* Error general */}
              {generalError && (
                <View style={styles.generalErrorContainer}>
                  <Ionicons name="alert-circle" size={20} color="#d32f2f" />
                  <Text style={styles.generalErrorText}>{generalError}</Text>
                </View>
              )}

              {/* Campo Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={[
                  styles.inputWrapper,
                  touched.email && errors.email && styles.inputWrapperError
                ]}>
                  <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="tu@email.com"
                    placeholderTextColor="#999"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Campo Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <View style={[
                  styles.inputWrapper,
                  touched.password && errors.password && styles.inputWrapperError
                ]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#999"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Botón Ingresar */}
              <TouchableOpacity
                style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                {isSubmitting ? (
                  <Text style={styles.loginButtonText}>Ingresando...</Text>
                ) : (
                  <>
                    <Ionicons name="log-in-outline" size={24} color="#fff" />
                    <Text style={styles.loginButtonText}>Ingresar</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Link a crear cuenta */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>¿No tenés cuenta?</Text>
                <TouchableOpacity onPress={handleCreateAccount} activeOpacity={0.7}>
                  <Text style={styles.footerLink}>Crear cuenta</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;



