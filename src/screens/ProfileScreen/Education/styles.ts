import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#fff',
    },
    accordionContent: {
		// paddingHorizontal: 16,
		paddingVertical: 8,
	},
    addWorkHistoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        justifyContent: 'flex-end',
    },
    addWorkHistoryText: {
        marginLeft: 8,
    },
    accordionItem: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accordionTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpacing: {
        marginLeft: 8,
    },
});