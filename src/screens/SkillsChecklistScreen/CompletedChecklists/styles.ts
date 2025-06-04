import { StyleSheet } from "react-native";
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  body: {
    padding: 16,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: theme.colors.text.light,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: theme.colors.primary.main,
    textAlign: 'center',
  },
});