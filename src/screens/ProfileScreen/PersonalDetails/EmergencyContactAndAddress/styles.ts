import { StyleSheet } from "react-native";
import { theme } from "../../../../theme";


export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  formSection: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleSection: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.primary.main,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    marginBottom: theme.spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.sm,
  },
  loadingFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.grey[100],
    borderRadius: 4,
  },
  loadingFieldText: {
    marginLeft: theme.spacing.sm,
  },
  sameAddressToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary.light + '20',
    borderRadius: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.status.error + '20',
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  errorIcon: {
    marginRight: theme.spacing.sm,
  },
  errorMessage: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  cancelButton: {
    flex: 1,
    marginRight: theme.spacing.xs,
  },
  saveButton: {
    flex: 1,
    marginLeft: theme.spacing.xs,
  },
  suggestionsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    maxHeight: 200,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    padding: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[200],
  },
  autocompleteLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  zipCodeContainer: {
    position: 'relative',
    zIndex: 10,
  },
  cityContainer: {
    position: 'relative',
    zIndex: 9,
  },
});