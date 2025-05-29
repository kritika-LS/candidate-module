import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../../theme";

const screenWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
  
    bottomSheetContainer: {
      // This style applies to the overall container of the bottom sheet
      // You can add shadow or other container-level styles here if needed
    },
    handleIndicator: {
      // Style for the small grabber indicator at the top of the bottom sheet
      backgroundColor: theme.colors.grey[400], // Example: make it a darker grey
      width: 40,
      height: 5,
      borderRadius: 2.5,
    },
    bottomSheetBackground: {
      // Style for the background of the bottom sheet itself
      backgroundColor: '#fff',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    // The contentContainer now replaces the old modalContainer for the actual content
    contentContainer: {
      paddingHorizontal: 16,
      paddingTop: 32,
      paddingBottom: 32,
      width: '100%',
      
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
      borderRadius: theme.spacing.lg,
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
