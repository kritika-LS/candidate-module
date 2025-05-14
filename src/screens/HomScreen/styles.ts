import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: theme.spacing.md,
  },
  section: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pendingActionSection: {
    backgroundColor: theme.colors.text.white,
    paddingHorizontal: 14,
    paddingVertical: theme.spacing.md,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 2,
  },
  pendingActionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingTasks: {
    borderWidth: 0.5,
    borderColor: theme.colors.grey[50],
    paddingVertical: 1.75,
    paddingHorizontal: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.grey[100],
    borderRadius: 2,
    marginLeft: 12
  },
});