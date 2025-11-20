import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/services/constants/theme';
import { styles } from './styles';

const Favorites: FC = () => {
  const insets = useSafeAreaInsets();

  const handleExplore = () => {
    router.push('/(tabs)' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={[styles.container, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.iconContainer}>
          <Ionicons name="heart-outline" size={100} color={styles.icon.color} />
        </View>
        
        <Text style={styles.title}>Tus favoritos</Text>
        <Text style={styles.subtitle}>
          Guardá tus platos favoritos aquí para encontrarlos fácilmente
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="bookmark-outline" size={24} color={styles.featureIcon.color} />
            <Text style={styles.featureText}>Acceso rápido</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="notifications-outline" size={24} color={styles.featureIcon.color} />
            <Text style={styles.featureText}>Notificaciones</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="pricetag-outline" size={24} color={styles.featureIcon.color} />
            <Text style={styles.featureText}>Ofertas especiales</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.exploreButton} onPress={handleExplore} activeOpacity={0.8}>
          <Ionicons name="compass-outline" size={20} color={styles.exploreButtonText.color} />
          <Text style={styles.exploreButtonText}>Explorar comidas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

