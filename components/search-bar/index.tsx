import React, { FC } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBarProps } from './types';
import { styles } from './styles';

const SearchBar: FC<SearchBarProps> = ({
  placeholder = '¿Qué querés pedir hoy?',
  value,
  onChangeText,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={22} color="#999" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
};

export default SearchBar;



