import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    marginBottom: 8,
  },
  descriptionText: {
    color: '#333',
  },
  viewMore: {
    color: '#1976D2',
    marginTop: 8,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  overviewItem: {
    width: '33%',
    marginBottom: 16,
  },
  overviewLabel: {
    color: '#888',
    fontWeight: '500',
  },
  overviewValue: {
    fontSize: 15,
    color: '#222',
  },
  educationLabel: {
    color: '#888',
    fontWeight: '500',
    fontSize: 15,
  },
  educationValue: {
    fontSize: 16,
    color: '#222',
    fontWeight: '400',
  },
  skillsChip: {
    borderWidth: 0.5,
    borderColor: theme.colors.text.light,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  skillsChipText: {
    color: theme.colors.text.light,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 8,
  },
}); 