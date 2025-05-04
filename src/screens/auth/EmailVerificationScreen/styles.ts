import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    body: {
        padding: 16,
        flex: 1
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    }
})