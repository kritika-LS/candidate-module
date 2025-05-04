import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

interface EmailInputProps {
  value: string;
  onChange: (text: string) => void;
  error: string;
}

export const EmailInput = ({ value, onChange, error }: EmailInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address
        <Text style={styles.mandatory}>{` *`}</Text>
      </Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Enter email address"
        keyboardType="email-address"
        value={value}
        onChangeText={onChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16 
  },
  label: { 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  mandatory: {
		color: 'red',
	},
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 12 
  },
  inputError: { 
    borderColor: 'red' 
  },
  errorText: { 
    color: 'red', 
    fontSize: 12, 
    marginTop: 4 
  },
});
