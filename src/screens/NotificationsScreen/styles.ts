import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.paper,
  },
  markAllContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.background.default,
  },
  listContent: {
    paddingHorizontal: 0,
    paddingBottom: 24,
  },
  notificationCard: {
    backgroundColor: theme.colors.background.default,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[300],
  },
  highlightCard: {
    backgroundColor: theme.colors.blue_light + 90,
  },
  message: {
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionLink: {
    fontWeight: 'bold',
  },
});