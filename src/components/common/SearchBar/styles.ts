import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8, 
    paddingHorizontal: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ccc', 
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderTextColor: {
    color: '#777',
  },
});