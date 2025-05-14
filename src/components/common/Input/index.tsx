import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
  TextStyle as RNTextStyle,
} from 'react-native';
import {TextStyle} from '../Text';
import {styles} from './styles';
import {theme} from '../../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  inputContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<RNTextStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  touched,
  required,
  style,
  disabled,
  rightIcon,
  inputContainerStyle,
  ...props
}) => {
  const showError = touched && !!error;

  return (
    <View style={styles.container}>
      {label && (
        <TextStyle
          variant="medium"
          size="sm"
          style={[styles.label, disabled && styles.labelDisabled]}>
          {label} {required && <TextStyle style={styles.asterisk}>*</TextStyle>}
        </TextStyle>
      )}

      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          style={[
            styles.input,
            rightIcon ? styles.inputWithIcon : undefined,
            showError ? styles.inputError : undefined,
            disabled ? styles.inputDisabled : undefined,
            style,
          ]}
          placeholderTextColor={
            disabled ? theme.colors.grey[400] : theme.colors.text.disabled
          }
          editable={!disabled}
          {...props}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>

      {showError && (
        <TextStyle variant="regular" size="xs" style={styles.errorText}>
          {error}
        </TextStyle>
      )}
    </View>
  );
};
