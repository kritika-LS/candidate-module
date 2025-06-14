import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
  menuCard: {
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    backgroundColor: theme.colors.text.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // gap: 16,
    // minHeight: 80,
    elevation: 1,
  },
  menuCardDraft: {
    borderColor: theme.colors.status.warning,
    backgroundColor: theme.colors.background.default,
  },
  menuCardSelected: {
    borderColor: theme.colors.primary.main,
    backgroundColor: '#F5F9FF',
  },
  menuCardCompleted: {
    borderColor: theme.colors.status.success,
    backgroundColor: theme.colors.background.default,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: theme.colors.grey[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  draftPill: {
    backgroundColor: theme.colors.status.warning + '20', // faded orange
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
});