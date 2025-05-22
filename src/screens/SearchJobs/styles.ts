import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  jobsSection: {
    paddingBottom: 24,
    paddingHorizontal: 16
  },
  jobsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  jobsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#888',
    marginRight: 4,
  },
  sortDropdown: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sortValue: {
    fontSize: 14,
    color: '#222',
  },
  bookmarkIconBtn: {
    marginLeft: 10,
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#CBDEF4',
  },
  saveSearchInput: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  savedSearchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1976D2',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  savedSearchChipText: {
    marginRight: 4,
  },
});