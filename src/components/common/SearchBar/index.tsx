// components/SearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from '../Icon/Icon';
import { styles } from './styles';
import { theme } from '../../../theme';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholderTextColor.color}
      />
      <Icon name='magnify' style={styles.searchIcon} color={theme.colors.text.light} />
    </View>
  );
};