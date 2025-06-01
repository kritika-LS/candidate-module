import { StyleSheet } from "react-native";
import { theme } from "../../../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    borderWidth: 0.7,
    borderColor: theme.colors.grey[300],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    marginRight: 16,
  },
  defaultIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.grey[100],
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  defaultIconText: {
    fontSize: 24,
  },
  titleContainer: {

  },
  subtitle1: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    position: 'absolute', // Position absolutely within the card
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 8,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 4,
  },
  pillContainer: {
    backgroundColor: theme.colors.blue.light,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  experienceDetailsCard: {
    borderRadius: 8,
    paddingVertical: 16,
    marginVertical: 12,
    borderTopWidth: 0.7,
    borderColor: theme.colors.grey[200],
  },
  flexWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12, // space between items
    marginTop: 12,
  },
  detailItem: {
    flexShrink: 1,
    minWidth: '45%', // tries to keep two items per line
    maxWidth: '100%', // avoids overflow
  },
  
});