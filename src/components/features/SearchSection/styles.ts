import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
	backgroundImage: {
		width: "100%",
		justifyContent: 'center',
	},
	container: {
		padding: 16,
	},
	header: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	description: {
		color: '#e0e0e0',
		fontSize: 14,
		marginBottom: 16,
	},
	searchBody: {
		// backgroundColor: theme.colors.text.white,
		// paddingHorizontal: 14,
		paddingVertical: 20,
		borderRadius: 8,
		// borderWidth: 1,
		// borderColor: theme.colors.grey[40]
	},
	searchRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	searchInput: {
		flex: 1,
		color: '#222',
		marginRight: 12,
		backgroundColor: theme.colors.text.white,
		borderWidth: 1,
		borderColor: theme.colors.grey.EDEF,
		borderRadius: 8,
	},
	searchButton: {
		backgroundColor: theme.colors.blue.light,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 6,
	},
	chipRowWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
		flexWrap: 'wrap',
	},
	chipList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		flex: 1,
	},
	chip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#CBDEF4',
		borderRadius: 16,
		paddingHorizontal: 12,
		paddingVertical: 6,
		marginRight: 8,
		marginBottom: 8,
	},
	crossIcon: {
		marginLeft: theme.spacing.xs,
		marginTop: theme.spacing.xs,
	},
	clearAllBtn: {
		marginLeft: 8,
		padding: 4,
	},
	clearAllText: {
		color: theme.colors.primary.main,
		fontWeight: '600',
		fontSize: 13,
	},
	divider: {
		height: 1,
		backgroundColor: theme.colors.grey[40],
		marginVertical: 16,
		width: '100%',
	},
	filterButton: {
		backgroundColor: theme.colors.blue.light,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 6,
		marginLeft: 10,
	},
	filterButtonText: {
		color: theme.colors.text.white,
		fontWeight: '600',
		fontSize: 15,
		marginLeft: 8,
	},
	bookmarkIconBtn: {
		marginLeft: 10,
		padding: 6,
		borderRadius: 16,
		backgroundColor: '#F2F6FF',
	},
	searchInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
	},
	crossIconContainer: {
		position: 'absolute',
		right: 60,
		padding: 4,
	},
}); 