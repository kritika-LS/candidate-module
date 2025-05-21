import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body:{
    margin: 16,
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
  dateText: {
  },
  calendarIcon: {
  },
  saveButton: {
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingBottom: 16
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
saveBtn: {
    marginTop: 24,
    backgroundColor: '#0A47E9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
});