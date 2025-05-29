  import { StyleSheet } from "react-native";
import { theme } from "../../theme";

  export const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    scrollContent: {
      flex: 1,
    },
    jobsSection: {
      paddingBottom: 24,
      paddingHorizontal: 16
    },
    jobsHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      marginHorizontal: 16,
    },
    jobsCount: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
    },
    sortRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sortLabel: {
      fontSize: 14,
      color: '#888',
      marginRight: 4,
    },
    sortDropdown: {
      backgroundColor: '#fff',
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      flexDirection: 'row'
    },
    sortValue: {
      fontSize: 14,
      color: '#222',
    },
    bookmarkIconBtn: {
      marginLeft: 10,
      padding: 4,
      borderRadius: 16,
      backgroundColor: '#CBDEF4',
    },
    saveSearchInput: {
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 10,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#fff',
      marginBottom: 8,
    },
    savedSearchChip: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#1976D2',
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 6,
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: '#fff',
    },
    savedSearchChipText: {
      marginRight: 4,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.colors.text.light,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    suggestionsContainer: {
        position: 'absolute',
        right: 0,
        top: 30,
        backgroundColor: theme.colors.background.paper,
        borderWidth: 1,
        borderColor: theme.colors.grey[300],
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 99999,
        maxHeight: 200,
        width: '26%',
      },
      suggestionsList: {
        maxHeight: 200,
      },
      suggestionItem: {
        padding: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.grey[200],
      },
  });