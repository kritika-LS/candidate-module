import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';
import Icon from './Icon/Icon';

export type ChipStatus = 'terminated' | 'success' | 'completed' | 'warning';

interface ChipProps {
  chipName: string;
  status: ChipStatus;
  style?: ViewStyle;
  textStyle?: TextStyle;
  showDot?: boolean;
}

const getStatusStyles = (status: ChipStatus) => {
  switch (status) {
    case 'terminated':
      return {
        color: '#b91c1c',
        backgroundColor: '#fef2f2',
        borderColor: '#fee2e2cc',
      };
    case 'success':
      return {
        color: '#15803d',
        backgroundColor: '#f0fdf4',
        borderColor: '#dcfce7cc',
      };
    case 'completed':
      return {
        color: theme.colors.blue.light,
        backgroundColor: '#eff6ff',
        borderColor: '#dbeafecc',
      };
      case 'warning':
      return {
        color: theme.colors.accent.main,
        backgroundColor: theme.colors.status.warning + '20',
        borderColor: '#dbeafecc',
      };
    default:
      return {
        color: theme.colors.text.primary,
        backgroundColor: theme.colors.background.default,
        borderColor: '',
      };
  }
};

const Chip: React.FC<ChipProps> = ({ chipName, status, style, textStyle, showDot = false }) => {
  const statusStyles = getStatusStyles(status);

  return (
    <View style={[styles.chip, { borderColor: statusStyles.borderColor ,backgroundColor: statusStyles.backgroundColor }, style]}>
      { showDot && <Icon name='circle' size={12} color={statusStyles.color} />}
      <Text style={[styles.chipText, { color: statusStyles.color }, textStyle]}>{chipName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Chip; 