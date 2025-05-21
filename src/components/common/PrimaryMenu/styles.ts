import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
    accordionItem: {
        marginBottom: 8,
        borderRadius: 12,
        backgroundColor: theme.colors.text.white,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.grey[300],
        elevation: 2,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.colors.text.white,
        borderBottomColor: theme.colors.grey[300],
        borderBottomWidth: 1,
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
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconSpacing: {
		marginLeft: theme.spacing.xs,
	},

})