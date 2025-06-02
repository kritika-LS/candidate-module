import { StyleSheet } from 'react-native';
import { theme } from '../../../../theme';

const styles = StyleSheet.create({
    
	container: { flexGrow: 1 },
	checkboxContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
	checkboxRow: { width: '50%', marginBottom: 16 },
	otherInputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 6,
		paddingHorizontal: 12,
		fontSize: 14,
        letterSpacing: 1,
        color: theme.colors.text.primary,
	},
	addButton: {
		backgroundColor: '#1976D2',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 6,
	},
	chipList: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
	chip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#E3F2FD',
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
	body: {
		marginVertical: 16,
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
		backgroundColor: '#fff',
    },
});

export default styles;