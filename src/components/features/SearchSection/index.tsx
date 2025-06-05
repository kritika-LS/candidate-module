import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, Keyboard } from 'react-native';
import Icon from '../../common/Icon/Icon';
import { TextStyle } from '../../common/Text';
import { styles } from './styles';
import { theme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

interface SearchSectionProps {
  title: string;
  subTitle: string;
  searchValue: string;
  onSearchValueChange: (val: string) => void;
  onSearch: () => void;
  chips?: string[];
  onRemoveChip?: (chip: string) => void;
  onClearAll: () => void;
  onFilterPress?: () => void;
  showFilter?: boolean;
  placeholder?: string;
  showCrossIcon?: boolean;
  showBackButton?: boolean;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  title,
  subTitle,
  searchValue,
  onSearchValueChange,
  onSearch,
  chips=[],
  onRemoveChip,
  onClearAll,
  onFilterPress,
  showFilter=true,
  placeholder,
  showCrossIcon = false,
  showBackButton,
}) => {
  const navigation = useNavigation();
  // Handle Enter key in TextInput
  const handleSubmitEditing = () => {
    if (searchValue.trim()) {
      onSearch();
      Keyboard.dismiss();
    }
  };

  const handleClearSearch = () => {
    onSearchValueChange('');  // Clear the search value
    onSearch();  // Trigger search with empty value to reset results
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/dashboardGreetingBg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
        {showBackButton && <TouchableOpacity onPress={() => navigation.goBack()}><Icon name='arrow-left' color='#fff' /></TouchableOpacity>}
        <Text style={styles.header}>{title}</Text>
        </View>
        <Text style={styles.description}>
          {subTitle}
        </Text>

        <View style={styles.searchBody}>
          <View style={styles.searchRow}>
            <TextInput
              style={[styles.searchInput, { fontSize: 14 }]}
              placeholder={placeholder || "Search by job title, reference number"}
              value={searchValue}
              onChangeText={onSearchValueChange}
              onSubmitEditing={handleSubmitEditing}
              returnKeyType="search"
              placeholderTextColor="#888"
            />
            {(showCrossIcon && searchValue.length > 0) && (
              <TouchableOpacity 
                onPress={handleClearSearch}
                style={styles.crossIconContainer}
              >
                <Icon name="close" size={20} color={theme.colors.grey[400]} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.searchButton} onPress={handleSubmitEditing}>
              <Icon name='magnify' color='#fff' />
            </TouchableOpacity>
          {showFilter && <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Icon name="filter-outline" color={'#fff'} />
          </TouchableOpacity>}
          </View>

          {(chips && chips.length) > 0 && (
            <View style={styles.chipRowWrapper}>
              <View style={styles.chipList}>
                {chips.map((chip, idx) => (
                  <TouchableOpacity onPress={onSearch} key={idx} style={styles.chip}>
                    <TextStyle variant="regular" size='sm'>{chip}</TextStyle>
                    <TouchableOpacity 
                      style={styles.crossIcon} 
                      onPress={() => {
                        if (onRemoveChip) {
                          onRemoveChip(chip);
                        }
                      }}
                    >
                      <Icon name="close" size={16} color="#1976D2" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity onPress={onClearAll} style={styles.clearAllBtn}>
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};
