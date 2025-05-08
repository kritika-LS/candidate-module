import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scene: {
      flex: 1,
      padding: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      padding: 10,
      marginBottom: 12
    },
    tabBarContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tabItem: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '25%',
      paddingVertical: 10,
    },
    icon: {
      marginBottom: 4,
    },
    tabText: {
      fontSize: 10,
    },
    activeIndicator: {
      height: 2,
      marginTop: 6,
      width: '100%',
      backgroundColor: '#2589f5',
    },
});