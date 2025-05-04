import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import { theme } from '../../../theme';

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  error?: string;
  label: string;
	placeholder?: string;
}

export const PasswordInput = ({ value, onChange, error, label, placeholder }: PasswordInputProps) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label} 
				<Text style={styles.mandatory}>{` *`}</Text>
			</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder={placeholder || "Enter password"}
          secureTextEntry={secureText}
          value={value}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
					<Icon name={secureText ? 'visibility-off' : 'visibility'} size={18} color='#ccc' />
        </TouchableOpacity>
      </View>
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
		marginBottom: 4,
		color: theme.colors.text.lightBold,
	},
	mandatory: {
		color: 'red',
	},
  inputWrapper: { 
		borderWidth: 1, 
		borderColor: '#ccc', 
		borderRadius: 8, 
		paddingHorizontal: 12, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between',
	},
  input: { 
		flex: 1, 
	},
  inputError: { 
		borderColor: 'red' 
	},
  toggle: { 
		marginLeft: 8, 
		color: '#347CD5', 
		fontWeight: 'bold' 
	},
  errorText: { 
		color: 'red', 
		fontSize: 12, 
		marginTop: 4 
	},
});
