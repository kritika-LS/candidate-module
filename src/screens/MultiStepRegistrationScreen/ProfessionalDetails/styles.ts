import { StyleSheet } from "react-native";
import { theme } from "../../../theme";


export const styles = StyleSheet.create({
    container: { padding: 16 },
    label: { marginTop: 12, fontWeight: 'bold' },
    input: {
      borderColor: '#aaa',
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      marginTop: 4,
    },
    dropdownItem: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: '#f0f0f0',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
    button: {
      marginTop: 20,
      backgroundColor: '#007bff',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    error: { color: 'red', marginTop: 4 },
    suggestionsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 80,
        backgroundColor: theme.colors.background.paper,
        borderWidth: 1,
        borderColor: theme.colors.grey[300],
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
        maxHeight: 200,
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