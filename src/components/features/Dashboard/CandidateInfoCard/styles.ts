import { StyleSheet } from "react-native";
import { theme } from "../../../../theme";

export const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		padding: theme.spacing.md,
		borderRadius: 12,
		marginVertical: 10,
		elevation: 2,
	},
	candidateInfoSection: {
		flexDirection: 'row',
	},
	initialsCard: {
		height: 48,
		width: 48,
		borderRadius: 50,
		backgroundColor: '#CBDEF4',
		justifyContent: 'center',
		alignItems: 'center',
	},
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
	candidiateInfo: {
		marginLeft: theme.spacing.md,
		flex: 1
	},
	name: {
		fontWeight: 'bold',
	},
	role: {
		color: 'green',
	},
	contactInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
        marginBottom: theme.spacing.xs
	},
    contactDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
	email: {
		fontSize: 10,
        marginLeft: theme.spacing.xs,
	},
	phone: {
		fontSize: 10,
        marginLeft: theme.spacing.xs,
	},
	progressBarContainer: {
        marginVertical: theme.spacing.xs
	},
    progressHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm
    },
	progressBar: {
		width: '60%',
		height: '100%',
		backgroundColor: '#4caf50',
	},
	button: {
		alignSelf: 'center',
		borderColor: theme.colors.primary.main,
		borderWidth: 1,
		borderRadius: 20,
		paddingVertical: 6,
		paddingHorizontal: 20,
        marginTop: theme.spacing.sm,
	},
	buttonText: {
		color: theme.colors.primary.main,
	},
});