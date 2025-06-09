import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { TextStyle } from '../../common/Text';
import { theme } from '../../../theme';

interface SaveButtonProps {
  onPress: any;
  title?: string;
  disabled?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onPress, title='Save', disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.saveBtn, disabled && styles.saveBtnDisabled]}
      onPress={onPress}
      accessibilityRole="button"
      activeOpacity={0.7}
      disabled={disabled}
    >
      <TextStyle style={[styles.saveBtnTextStyle, disabled && styles.saveBtnTextDisabled]}>{title}</TextStyle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    backgroundColor: theme.colors.blue.light,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
		gap: 10,
    alignItems: 'center',
		marginVertical: 16,
  },
  saveBtnDisabled: {
    backgroundColor: theme.colors.grey[300],
  },
  saveBtnTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveBtnTextDisabled: {
    color: theme.colors.text.white,
  },
});
