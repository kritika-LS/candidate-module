import React from 'react';
import { PasswordInput } from '../PasswordInput';

interface ConfirmPasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  error?: string;
	placeholder?: string;
}

export const ConfirmPasswordInput = ({ value, onChange, error, placeholder }: ConfirmPasswordInputProps) => {
  return (
    <PasswordInput
      value={value}
      onChange={onChange}
      error={error}
      label="Confirm Password"
    	placeholder={placeholder || "Enter password"}
    />
  );
};
