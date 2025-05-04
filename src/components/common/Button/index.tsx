/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  View,
  TextStyle,
} from 'react-native';
import { theme } from '../../../theme';
import Icon from '../Icon/Icon';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'neutral' | 'primaryBordered';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  loading?: boolean;
  leftIcon?: string;
  iconSize?: number;
  iconColor?: string;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  style,
  loading = false,
  leftIcon,
  iconSize = 20,
  iconColor,
  textStyle,
}) => {
  const buttonStyles = {
    primary: {
      backgroundColor: disabled
        ? theme.colors.grey[300]
        : theme.colors.primary.main,
      color: disabled ? theme.colors.grey[600] : theme.colors.text.white,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: disabled
        ? theme.colors.grey[300]
        : theme.colors.background.default,
      color: disabled ? theme.colors.grey[600] : theme.colors.text.primary,
      borderColor: disabled
        ? theme.colors.grey[400]
        : theme.colors.primary.main,
    },
    accent: {
      backgroundColor: disabled
        ? theme.colors.grey[300]
        : theme.colors.accent.main,
      color: disabled ? theme.colors.grey[600] : theme.colors.text.primary,
      borderColor: 'transparent',
    },
    neutral: {
      backgroundColor: disabled
        ? theme.colors.grey[300]
        : theme.colors.neutral.main,
      color: disabled ? theme.colors.grey[600] : theme.colors.text.dark,
      borderColor: 'transparent',
    },
    primaryBordered: {
      backgroundColor: theme.colors.background.paper,
      color: disabled ? theme.colors.grey[600] : theme.colors.primary.main,
      borderWidth: 1,
      borderColor: disabled
        ? theme.colors.grey[300]
        : theme.colors.primary.main,
    }
  };

  const iconDefaultColor = iconColor || buttonStyles[variant].color;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: buttonStyles[variant].backgroundColor,
          borderColor: buttonStyles[variant].borderColor,
          borderWidth: variant === 'secondary' ? 2 : 0,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color={buttonStyles[variant].color} />
      ) : (
        <View style={styles.buttonContent}>
          {leftIcon && (
            <Icon
              name={leftIcon}
              size={iconSize}
              color={iconDefaultColor}
            />
          )}
          <Text style={[styles.text, {color: buttonStyles[variant].color}, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: theme.spacing.xs,
  },
  text: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.md,
    fontWeight: '500',
  },
});
