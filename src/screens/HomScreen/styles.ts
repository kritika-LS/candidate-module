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
    width: '100%'
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
    marginBottom: 12,
    width: '100%',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sortByText: {
    position: 'absolute',
    right: 130,
    top: 6
  },
  dropdown: {
    borderWidth: 0.5,
    borderRadius: 24,
    backgroundColor: '#fafafa',
    borderColor: theme.colors.background.dark,
    width: 120,
    height: 32,
    minHeight: 32,
    maxHeight: 32,
  },
  dropdownLabel: {
    fontSize: 12,
    color: theme.colors.primary.main,
  },
  dropdownContainer: {
    borderColor: '#d4d4d4',
    zIndex: 1000,
  },
});