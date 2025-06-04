import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({

  footer: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  attestationContainer: {
    borderWidth: 1,
    borderColor: '#fde68a',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerButtonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  footerButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary.main,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  disabledButton: {
    borderColor: theme.colors.grey[300],
  }

})