import React from 'react';
import { PasswordInput } from '../PasswordInput';

interface ConfirmPasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  error: string;
}

export const ConfirmPasswordInput = ({ value, onChange, error }: ConfirmPasswordInputProps) => {
  return (
    <PasswordInput
      value={value}
      onChange={onChange}
      error={error}
      label="Confirm Password"
    />
  );
};
