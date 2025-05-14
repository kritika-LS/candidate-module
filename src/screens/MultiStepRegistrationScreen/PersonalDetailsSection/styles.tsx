import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 12,
      fontSize: 16,
    },
    phoneInputContainer: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    },
    phoneInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 12,
      fontSize: 16,
      marginLeft: 10,
    },
    errorInput: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
    registerButton: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    registerButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    footerText: {
      textAlign: 'center',
      marginTop: 20,
      color: '#007AFF',
    },
    copyright: {
      textAlign: 'center',
      marginTop: 10,
      color: '#666',
      fontSize: 12,
    },
});