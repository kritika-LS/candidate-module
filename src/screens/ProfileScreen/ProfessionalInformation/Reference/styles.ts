import { StyleSheet } from 'react-native';
import { theme } from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginTop: 16,
    marginBottom: 25,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  safeArea: {
    flex: 1,
  },
  uploadGroup: {
    alignItems: 'center',
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: '#007bff',
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    width: '70%',
  },
  uploadBtnText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
  },
  note: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#0A47E9',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#0A47E9',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginRight: 16
  },
});

export default styles;