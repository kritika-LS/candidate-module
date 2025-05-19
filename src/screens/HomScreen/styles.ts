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
    flex: 1,
    // marginTop: theme.spacing.md,
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
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  sortSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    borderWidth: 0.5,
    borderRadius: 24,
    backgroundColor: '#fafafa',
    borderColor: theme.colors.text.light,
    width: 120,
    marginVertical: 12,
    alignSelf: 'center',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownLabel: {
    fontSize: 12,
    color: theme.colors.primary.main,
  },
  dropdownContainer: {
    borderColor: '#d4d4d4',
  },
});