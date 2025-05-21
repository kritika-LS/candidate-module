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
  header: {
    // marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingBottom: 16
  },
});