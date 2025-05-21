import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
    
        accordionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.colors.text.white,
            marginBottom: theme.spacing.lg,
        },
        accordionTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        accordionTitle: {
            marginLeft: theme.spacing.sm,
            color: theme.colors.text.heading,
        },
        incompleteCircle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.colors.primary.main,
        },
        accordionContent: {
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        flexRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        iconSpacing: {
            marginLeft: theme.spacing.xs,
        },
});