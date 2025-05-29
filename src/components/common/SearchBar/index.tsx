// components/SearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import { styles } from './styles';
import { theme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

interface SearchBarProps {
  placeholder?: string;
  showSearchIcon?: boolean;
  inputStyle?: {};
  containerStyle?: {};
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, showSearchIcon = false, inputStyle, containerStyle }) => {

  const navigation = useNavigation();

  const handleOnSearchPress = () => {
    //@ts-ignore
    navigation.navigate('Search Jobs');
  }

  return (
    <TouchableOpacity onPress={handleOnSearchPress} style={[styles.searchBarContainer, containerStyle]} activeOpacity={0.7}>
      <TextInput
        style={[styles.searchInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholderTextColor.color}
        editable={false}
      />
      {showSearchIcon && <Icon name='magnify' style={styles.searchIcon} color={theme.colors.text.light} />}
    </TouchableOpacity>
  );
};