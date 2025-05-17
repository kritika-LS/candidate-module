import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
	modalContainer: {
		borderWidth: 1,
		borderColor: theme.colors.grey[500],
		borderStyle: 'dashed',
	},
	body: {
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	fileIconContainer: {
		marginBottom: 20,
		alignItems: 'center',
	},
	uploadText: {
		textAlign: 'center',
		marginTop: 12,
		width: '85%',
	},
	chooseFileButton: {
		backgroundColor: theme.colors.blue.light,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 24,
	},
	chooseFileButtonText: {
		color: '#fff',
		fontSize: 16,
	},
	waterContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: theme.colors.blue.light,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	water: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: theme.colors.blue.light,
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		// height will be animated
	},
	wave: {
		position: 'absolute',
		width: 100,
		height: 20,
		borderRadius: 50,
		backgroundColor: 'rgba(0, 123, 255, 0.3)', // Lighter wave color
		bottom: 15, // Adjust as needed
	},
	fileName: {
		fontSize: 16,
		fontWeight: '500',
		color: theme.colors.grey[800],
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'center'
	},
	processingText: {
		fontSize: 14,
		color: theme.colors.grey[700],
		textAlign: 'center',
	},
	fileImage: { 
		width: 86,
		height: 106,
	},
});