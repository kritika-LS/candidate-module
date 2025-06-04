import React from 'react';
import { Text, TextStyle as RNTextStyle, TextProps, View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../../theme';
import Icon from '../Icon/Icon';

interface TextStyleProps extends TextProps {
  variant?: keyof typeof theme.typography.fontFamily;
  size?: keyof typeof theme.typography.fontSize;
  color?: string;
  leftIcon?: string;
  iconColor?: string;
  rotationAngle?: string;
}

export const TextStyle: React.FC<TextStyleProps> = ({
  children,
  variant = 'regular',
  size = 'md',
  color = theme.colors.text.primary,
  style,
  leftIcon,
  iconColor,
  rotationAngle,
  ...props
}) => {
  const fontStyle: RNTextStyle = {
    fontFamily: theme.typography.fontFamily[variant],
    fontSize: theme.typography.fontSize[size],
    color: color,
    fontWeight:
      variant === 'bold' ? 'bold' :
      variant === 'medium' ? '500' :
      variant === 'light' ? '300' : 'normal',
  };

  return (
    <>
    { leftIcon ? 
      <View style={styles.flexRow}>
      {leftIcon && (
        <Icon
          name={leftIcon}
          color={iconColor ? iconColor : theme.colors.text.light}
          size={theme.typography.fontSize[size]}
          style={[styles.iconSpacing, rotationAngle && {transform: [{ rotate: rotationAngle }]}]}
        />
      )}
      <Text style={[fontStyle, style]} {...props}>
        {children}
      </Text>
    </View>
    :
    <Text style={[fontStyle, style]} {...props}>
      {children}
    </Text>

    }
  </>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  iconSpacing: {
    marginRight: theme.spacing.xs,
  }
});
