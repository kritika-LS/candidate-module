import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0C1220',
    },
    header: {
      padding: 20,
      paddingBottom: 10,
    },
    brand: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    highlight: {
      color: '#4E97FD',
    },
    menu: {
      marginTop: 10,
    },
    label: {
      color: '#fff',
      fontSize: 16,
    },
    footer: {
      borderTopWidth: 0.5,
      borderTopColor: '#333',
      padding: 20,
    },
    timestamp: {
      color: '#ccc',
      fontSize: 12,
      marginBottom: 10,
    },
    logout: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoutText: {
      color: '#fff',
      marginLeft: 10,
      fontSize: 16,
    },
});