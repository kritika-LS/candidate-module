import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3, // For Android shadow
		position: 'relative', // Needed for absolute positioning of actions
	},
	header: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 8,
		// justifyContent: 'flex-start',
	},
	title: {
		// width: '65%',
	},
	icon: {
		marginRight: 12,
	},
	defaultIcon: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: theme.colors.blue.light,
		marginRight: 12,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 6,
	},
	defaultIconText: {
		fontSize: 24,
	},
	titleContainer: {

	},
	subtitle1: {
		fontSize: 14,
		color: '#666',
	},
	subtitle2: {
		fontSize: 14,
		color: '#666',
	},
	// workSpaceName: {
	// 	fontWeight: '500',
	// 	marginBottom: 4,
	// },
	ratio: {
		marginBottom: 4,
	},
	detailsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	location: {
		fontSize: 14,
		color: '#333',
	},
	actions: {
		position: 'absolute', // Position absolutely within the card
		top: 16,
		right: 16,
		flexDirection: 'row',
	},
	actionButton: {
		marginLeft: 8,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconSpacing: {
		marginRight: 4,
	},
	pillContainer: {
		backgroundColor: theme.colors.blue.light,
		borderRadius: 2,
		paddingVertical: 2,
		paddingHorizontal: 6,
		marginLeft: 8,
	}
});