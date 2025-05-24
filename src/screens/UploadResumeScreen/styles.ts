import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
    },
    // mainContainer: {
    //     flex: 1,
    // },
    body: {
        // flex: 1,
        padding: theme.spacing.md,
    },
    skipButton: {
        borderWidth: 1,
        borderRadius: 24,
        alignSelf: 'flex-end',
        height: 32,
        marginTop: 20,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.text.white,
        borderColor: theme.colors.primary.main,
    },
    uploadBox: {
      alignItems: 'center',
      padding: 30,
      borderWidth: 1,
      borderColor: '#ccc',
      borderStyle: 'dashed',
      borderRadius: 10,
      marginTop: 50,
    },
    uploadImage: {
        height: 108,
        width: 86
    },
    chooseBtn: {
      backgroundColor: theme.colors.primary.main,
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 24,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    chooseBtnText: {
      color: theme.colors.text.white,
      fontWeight: '600',
      left: 6
    },
    uploadText: {
      marginTop: 20,
      fontWeight: '500',
    },
    subText: {
      textAlign: 'center',
      marginTop: 10,
    },
    loader: {
      height: 75,
      width: 75,
      borderRadius: 50,
      padding: 2,
      borderWidth: 1,
      borderColor: theme.colors.primary.main,
      backgroundColor: theme.colors.text.white,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      overflow: 'hidden',
    },
    cancelBtn: {
      marginTop: 20,
      borderColor: theme.colors.primary.main,
      borderWidth: 1,
      paddingHorizontal: 32,
      paddingVertical: 10,
      borderRadius: 24,
    },
    cancelText: {
      color: theme.colors.primary.main,
      fontWeight: '600',
    },
    lottie: {
      width: 70,
      height: 70,
      alignSelf: 'center',
      justifyContent: 'center',
    },
})