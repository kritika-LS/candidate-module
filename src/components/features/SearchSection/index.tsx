import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput, Keyboard } from 'react-native';
import { SearchBar } from '../../common/SearchBar';
import Icon from '../../common/Icon/Icon';
import { theme } from '../../../theme';
import { TextStyle } from '../../common/Text';
import { styles } from './styles';

interface SearchSectionProps {
  searchValue: string;
  onSearchValueChange: (val: string) => void;
  onSearch: () => void;
  chips: string[];
  onRemoveChip: (chip: string) => void;
  onClearAll: () => void;
  onFilterPress: () => void;
  openSaveSearchModal: (searchName?: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchValue,
  onSearchValueChange,
  onSearch,
  chips,
  onRemoveChip,
  onClearAll,
  onFilterPress,
  openSaveSearchModal,
}) => {
  // Handle Enter key in TextInput
  const handleSubmitEditing = () => {
    if (searchValue.trim()) {
      onSearch();
      Keyboard.dismiss();
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/dashboardGreetingBg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header}>Search Jobs</Text>
        <Text style={styles.description}>
          Explore our latest healthcare job openings and apply for the one that best suits you
        </Text>

        <View style={styles.searchBody}>
          <View style={styles.searchRow}>
            <TextInput
              style={[styles.searchInput, { fontSize: 14 }]}
              placeholder="Search by job title, job reference number"
              value={searchValue}
              onChangeText={onSearchValueChange}
              onSubmitEditing={handleSubmitEditing}
              returnKeyType="search"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSubmitEditing}>
              <Icon name='magnify' color='#fff' />
            </TouchableOpacity>
          </View>

          {chips.length > 0 && (
            <View style={styles.chipRowWrapper}>
              <View style={styles.chipList}>
                {chips.map((chip, idx) => (
                  <View key={idx} style={styles.chip}>
                    <TextStyle variant="regular" size='sm'>{chip}</TextStyle>
                    <TouchableOpacity style={styles.crossIcon} onPress={() => onRemoveChip(chip)}>
                      <Icon name="close" size={16} color="#1976D2" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <TouchableOpacity onPress={onClearAll} style={styles.clearAllBtn}>
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Divider */}
          <View style={styles.divider} />
          {/* Filter Button */}
          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Icon name="filter-variant" size={20} color={theme.colors.primary.main} />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

