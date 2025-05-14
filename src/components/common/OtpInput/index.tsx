import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import { theme } from '../../../theme';

interface OtpInputProps {
  value: string[];
  onChange: (index: number, text: string) => void;
}

const { width: screenWidth } = Dimensions.get('window');
const numberOfDigits = 6;
const spacing = 8; // Small space between each input
const totalSpacing = spacing * (numberOfDigits - 1);
const inputWidth = (screenWidth - 40 - totalSpacing) / numberOfDigits; 

export const OTPInput = ({ value, onChange }: OtpInputProps) => {
  // Combine value array to a full string
  const otpValue = value.join('');

  const handleOtpChange = (text: string) => {
    const newValue = text.split('');
    for (let i = 0; i < 6; i++) {
      onChange(i, newValue[i] || '');
    }
  };

  return (
    <View style={styles.container}>
      <OtpInput
        numberOfDigits={6}
        otp={otpValue}
        onTextChange={handleOtpChange}
        focusColor={theme.colors.primary.main}
        theme={{
          pinCodeTextStyle: styles.input,
          pinCodeContainerStyle: [
            styles.inputBox,
            { width: inputWidth },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 0,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  inputBox: {
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
