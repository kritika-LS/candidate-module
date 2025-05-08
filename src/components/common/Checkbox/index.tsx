import React from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextStyle} from '../Text';
import {styles} from './styles';
import { theme } from '../../../theme';
import Icon from '../Icon/Icon';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  mandatory?: boolean;
  size?: any
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, mandatory, onChange, size=14, disabled=false }) => {
  return (
      <View style={styles.checkBoxContainer}>
          {mandatory ? <TextStyle variant="regular" color="red">*</TextStyle> : null}
          <Pressable onPress={() => onChange(!checked)} disabled={disabled} style={[styles.checkbox, disabled ? styles.disabledChecked : (checked && styles.checked)]}>
          {checked && <Icon
              name="check"
              size={size}
              color={theme.colors.text.white}
          />}
        </Pressable>
        <TextStyle variant="regular" size={size}>{label}</TextStyle>
      </View>
    );
};
