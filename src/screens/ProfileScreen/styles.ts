import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({

	container: {
		flex: 1,
		// backgroundColor: theme,
	},
	candidateInfoCard: {
		padding: theme.spacing.md,
	},
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
		height: 50,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	tabItem: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		// width: '21%',
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	icon: {
		marginBottom: 4,
	},
	tabText: {
		fontSize: 12,
	},
	activeIndicator: {
		height: 2,
		marginTop: 6,
		width: '100%',
		backgroundColor: theme.colors.primary.main,
	},
	sectionContainer: {
		// flex: 1,
		padding: 16,
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
	accordionItem: {
		marginBottom: 8,
		borderRadius: 8,
		backgroundColor: theme.colors.text.white,
		overflow: 'hidden',
	},
	accordionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: theme.colors.text.white,
	},
	accordionTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	accordionTitle: {
		marginLeft: theme.spacing.xs,
		color: theme.colors.text.heading,
	},
	incompleteCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: theme.colors.primary.main,
	},
	accordionContent: {
		padding: 16,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
		color: theme.colors.text.dark,
	},
	subTitle: {
		fontSize: 12,
		color: theme.colors.text.light,
		marginBottom: 16,
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
	}

})