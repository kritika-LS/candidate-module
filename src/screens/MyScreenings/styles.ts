import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  headerCard: {
    backgroundColor: theme.colors.primary.main,
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 32,
  },
  headerTitle: {
    color: theme.colors.text.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: theme.colors.text.white,
    fontSize: 14,
    marginTop: 4,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
  },
});