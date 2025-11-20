import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const Offers: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ofertas</Text>
      <Text style={styles.subtitle}>Próximamente encontrarás las mejores ofertas aquí</Text>
    </View>
  );
};

export default Offers;

