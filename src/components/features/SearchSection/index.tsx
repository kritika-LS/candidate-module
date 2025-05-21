import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchBar } from '../../common/SearchBar';
import Icon from '../../common/Icon/Icon';
import { theme } from '../../../theme';

interface SearchSectionProps {
  onFilterPress: () => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onFilterPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Jobs</Text>
      <Text style={styles.description}>
        Explore our latest healthcare job openings and apply for the one that best suits you
      </Text>
      <View style={styles.searchRow}>
        <SearchBar placeholder="Search by job title, job reference number" />
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Icon name="filter-variant" size={20} color={theme.colors.primary.main} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.main,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 0,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
  },
  filterText: {
    color: theme.colors.primary.main,
    fontWeight: '600',
    marginLeft: 4,
  },
}); 