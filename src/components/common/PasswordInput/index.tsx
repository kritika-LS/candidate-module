import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  error: string;
  label: string;
}

export const PasswordInput = ({ value, onChange, error, label }: PasswordInputProps) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label} *</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Enter password"
          secureTextEntry={secureText}
          value={value}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Text style={styles.toggle}>{secureText ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  inputError: { borderColor: 'red' },
  toggle: { marginLeft: 8, color: '#347CD5', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
});
