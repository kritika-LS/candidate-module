import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		padding: 16,
		marginVertical: 10,
		borderRadius: 12,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		minHeight: 200, // Ensure minimum height
	},
	jobHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		gap: 8,
	},
	tag: {
		color: '#8e24aa',
		backgroundColor: '#f3e5f5',
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 4,
		marginLeft: 10,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 8,
	},
	companyInfoSection: {
		marginTop: theme.spacing.sm,
		flexWrap: 'wrap',
	},
	iconSpacing: {
		marginLeft: theme.spacing.xs
	},
	ref: {
		marginVertical: theme.spacing.xs,
		marginLeft: theme.spacing.xs,
		flexShrink: 1,
	},
	rate: {
		marginVertical: 4,
		flexShrink: 1,
	},
	labels: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		marginVertical: 8,
	},
	greenLabel: {
		backgroundColor: theme.colors.green.light,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		minWidth: 120,
	},
	blueLabel: {
		backgroundColor: theme.colors.blue_light,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		minWidth: 120,
	},
	labelContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	labelText: {
		flexShrink: 1,
	},
	detailContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		gap: 8,
		marginTop: theme.spacing.sm,
	},
	detailPill: {
		backgroundColor: theme.colors.grey.light,
		borderColor: theme.colors.grey.g100,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 6,
		marginBottom: 2,
		flexShrink: 1,
	},
	jobCardFooter: {
		justifyContent: 'space-between',
		marginTop: theme.spacing.sm,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 8,
	},
	applyButton: {
		backgroundColor: theme.colors.primary.main,
		paddingVertical: 6,
		paddingHorizontal: theme.spacing.lg,
		borderRadius: theme.spacing.lg,
		minWidth: 80,
		alignItems: 'center',
	},
	applyText: {
		color: '#fff',
		textAlign: 'center',
	},
	jobTitleContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 8,
	},
	locationContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 8,
	},
	actionButtons: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
});