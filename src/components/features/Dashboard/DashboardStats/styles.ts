import { StyleSheet } from "react-native";
import { theme } from "../../../../theme";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 12,
	},
	card: {
		width: 120,
		borderRadius: 16,
		paddingVertical: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	countsection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	iconCircle: {
		height: 32,
		width: 32,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		marginBottom: 8,
	},
	count: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000',
		marginLeft: 24,
	},
	label: {
		fontSize: 14,
		color: '#333',
		textAlign: 'center',
		marginTop: 4,
	},
	chevronButton: {
		height: 20,
		width: 20,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: theme.colors.primary.main,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: '50%',
		transform: [{ translateY: -10 }],
		zIndex: 1,
	},
	leftChevron: {
		left: 4,
	},
	rightChevron: {
		right: 4,
	},
	wrapper: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
	},
});
