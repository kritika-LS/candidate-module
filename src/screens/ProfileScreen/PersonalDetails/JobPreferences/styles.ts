import { StyleSheet } from 'react-native';
import { theme } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body:{
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: {
  },
  calendarIcon: {
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
    suggestionsContainer: {
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      maxHeight: 200,
      borderRadius: 4,
      marginTop: 4,
    },
    suggestionItem: {
      padding: 12,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
    },
    suggestionsList: {
      maxHeight: 150,
    },
    savedSearchChip: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primary.main,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    savedSearchChipText: {
      marginRight: 8,
    },
    trashIcon: {
      padding: 2,
    },
    autocompleteLoadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.xs,
      marginTop: theme.spacing.xs,
    },
    zipCodeContainer: {
      position: 'relative',
      zIndex: 10,
    },
    cityContainer: {
      position: 'relative',
      zIndex: 9,
    },
    loadingFieldText: {
      marginLeft: theme.spacing.sm,
    },
});