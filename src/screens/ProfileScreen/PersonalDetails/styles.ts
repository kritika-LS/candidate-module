import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({

	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 6,
		padding: 10,
		marginBottom: 12
	},
	sectionHeader: {
		marginBottom: 16,
		justifyContent: 'space-between',
	},
	profileCompletionContainer: {
		marginBottom: 24,
	},
	completionItems: {
		marginTop: 8,
	},
	completionItem: {
		paddingVertical: 8,
		color: theme.colors.text.primary,
	},
	personalDetailsContainer: {
		flex: 1,
		paddingHorizontal: 16,
	},
	incompleteCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: theme.colors.primary.main,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconSpacing: {
		marginLeft: theme.spacing.xs,
	},
  saveButton: {
		borderTopWidth: 1,
		borderTopColor: theme.colors.grey[100],
    backgroundColor: '#fff', 
    paddingHorizontal: 24, 
		marginTop: 20
  },
})