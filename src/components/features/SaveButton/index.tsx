import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { TextStyle } from '../../common/Text';
import { theme } from '../../../theme';

interface SaveButtonProps {
  onPress: () => void;
  title?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onPress, title='Save' }) => {
  return (
    <TouchableOpacity
      style={styles.saveBtn}
      onPress={onPress}
      accessibilityRole="button"
      activeOpacity={0.7}
    >
      <TextStyle style={styles.saveBtnTextStyle}>{title}</TextStyle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    backgroundColor: theme.colors.blue.light,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 24,
		gap: 10,
    alignItems: 'center',
		marginVertical: 16,
  },
  saveBtnTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
