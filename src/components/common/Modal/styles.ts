import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: '#fff',
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 28,
      minWidth: 300,
      maxWidth: '90%',
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
    },
    crossIcon: {
			height: 20,
			width: 20,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 0.7,
			borderColor: theme.colors.grey[500],
			borderRadius: 50,
			alignSelf: 'flex-end',
		},
    body: {
			paddingVertical: 16
    },
    footer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    button: {
      paddingVertical: 6,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.spacing.sm,
    },
    primaryButton: {
      backgroundColor: theme.colors.blue.light,
    },
    primaryText: {
      color: '#fff',
      fontWeight: '600',
    },
    secondaryButton: {
      borderWidth: 1,
      borderColor: theme.colors.blue.light
    },
    secondaryText: {
      color: theme.colors.blue.light,
      fontWeight: '500',
    },
});