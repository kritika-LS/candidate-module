import { StyleSheet } from "react-native";


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
  });