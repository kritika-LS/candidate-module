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
		padding: 16,
	},
	incompleteCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: theme.colors.primary.main,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
		color: theme.colors.text.dark,
	},
	subTitle: {
		fontSize: 10,
		color: theme.colors.text.light,
		marginBottom: 16,
		marginTop: 8
	},
	formGroup: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		color: theme.colors.text.primary,
		marginBottom: 8,
	},
	phoneInput: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	countryCode: {
		padding: 12,
		borderWidth: 1,
		borderColor: theme.colors.primary.main,
		borderRightWidth: 0,
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4,
		backgroundColor: theme.colors.background.default,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconSpacing: {
		marginLeft: theme.spacing.xs,
	},
	uploadSection: {
		alignItems: 'flex-start'
	},
	profilepic: {
		height: 48,
		width: 48,
		backgroundColor: theme.colors.text.white,
		padding: 1,
		borderWidth: 1,
		borderColor: theme.colors.grey[400],
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	profilePicIcon: {
		backgroundColor: theme.colors.grey[300],
		borderRadius: 50,
		height: 44,
		width: 44,
		justifyContent: 'center',
		alignItems: 'center',
	},
	uploadProfilePic: {
		marginLeft: theme.spacing.lg,
	},
	uploadBtn: {
		borderWidth: 1,
		borderColor: theme.colors.primary.main,
		borderRadius: theme.spacing.lg,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
		width: Dimensions.get('screen').width*0.32,
	},
	profilePicImage: {
		width: 42,
		height: 42,
		borderRadius: 30,
	},
  saveButton: {
		borderTopWidth: 1,
		borderTopColor: theme.colors.grey[300],
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    // paddingBottom: 16
  },
})