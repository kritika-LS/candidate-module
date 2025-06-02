// Filename: styles.ts

import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
      marginVertical: 16,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  headerIcon: { fontSize: 20, marginRight: 8 },
  headerText: { fontWeight: 'bold', fontSize: 16, flex: 1 },
  status: { fontWeight: 'bold', fontSize: 12, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  completed: { color: '#388e3c', backgroundColor: '#e8f5e9' },
  incomplete: { color: '#d32f2f', backgroundColor: '#ffebee' },
  question: { fontSize: 15, fontWeight: '500', marginBottom: 12 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  radioButton: { flexDirection: 'row', alignItems: 'center', marginRight: 32 },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  radioOuterSelected: {
    borderColor: '#1976D2',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1976D2',
  },
  radioLabel: { fontSize: 15 },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
});

export default styles;
