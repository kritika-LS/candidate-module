import { StyleSheet } from "react-native";
import { theme } from "../../../theme";


export const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		padding: 16,
		marginVertical: 10,
		borderRadius: 12,
		elevation: 2,
	},
	jobHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    },
    companyInfoSection: {
        marginTop: theme.spacing.sm,
    },
	iconSpacing: {
        marginLeft: theme.spacing.xs
	},
	ref: {
		marginVertical: theme.spacing.xs,
        marginLeft: theme.spacing.xs
	},
	rate: {
		marginVertical: 4,
	},
	labels: {
		flexDirection: 'row',
		gap: 12,
	},
	greenLabel: {
		backgroundColor: theme.colors.green.light,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
	},
	blueLabel: {
		backgroundColor: theme.colors.blue_light,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
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
	},
	details: {
		backgroundColor: theme.colors.grey.light,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
		borderWidth: 0.8,
		borderColor: theme.colors.grey.g100,
		marginHorizontal: 8
	},
    jobCardFooter: {
        justifyContent: 'space-between',
    },
	// posted: {
	// 	fontSize: 11,
	// 	color: '#999',
	// 	marginTop: 4,
	// },
	applyButton: {
		backgroundColor: theme.colors.primary.main,
		paddingVertical: 6,
        paddingHorizontal: theme.spacing.lg,
		marginTop: 10,
		borderRadius: theme.spacing.lg,
	},
	applyText: {
		color: '#fff',
		textAlign: 'center',
	},
});