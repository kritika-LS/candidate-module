import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({

    safeAreaContainer: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        padding: theme.spacing.md,
    },
    verifyButton: {
        borderRadius: 24,
        marginTop: theme.spacing.lg,
    },
    footer: {
        position: 'absolute',
        bottom: theme.spacing.lg,
        alignSelf: 'center',
    },
    confirmPasswordTitle: {
        marginBottom: theme.spacing.xl,
        fontWeight: 'condensed'
    }

})