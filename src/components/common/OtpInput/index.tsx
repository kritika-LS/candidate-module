import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OtpInputProps {
  value: string[];
  onChange: (index: number, text: string) => void;
}

export const OtpInput = ({ value, onChange }: OtpInputProps) => {
  return (
    <View style={styles.container}>
      {value.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={digit}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => onChange(index, text)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  input: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
  },
});
