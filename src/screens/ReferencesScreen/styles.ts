import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({

  container: {
		flex: 1,
		padding: 16,
  },
	sectionHeader: {
		marginBottom: 16,
		justifyContent: 'space-between',
	},
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: theme.spacing.xs,
  },
  addContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      justifyContent: 'flex-end',
  },
  addText: {
      marginLeft: 8,
  },

})