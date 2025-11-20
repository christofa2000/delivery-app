import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const Favorites: FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="heart-outline" size={80} color="#e91e63" />
      <Text style={styles.title}>Tus Favoritos</Text>
      <Text style={styles.subtitle}>Aún no has agregado ningún favorito</Text>
    </View>
  );
};

export default Favorites;

