// components/SearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from '../Icon/Icon';
import { styles } from './styles';
import { theme } from '../../../theme';

interface SearchBarProps {
  placeholder?: string;
  showSearchIcon?: boolean;
  inputStyle?: {};
  containerStyle?: {};
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, showSearchIcon = false, inputStyle, containerStyle }) => {
  return (
    <View style={[styles.searchBarContainer, containerStyle]}>
      <TextInput
        style={[styles.searchInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholderTextColor.color}
      />
      {showSearchIcon && <Icon name='magnify' style={styles.searchIcon} color={theme.colors.text.light} />}
    </View>
  );
};