import React from 'react';
import {Text, TextStyle as RNTextStyle, TextProps} from 'react-native';
import {theme} from '../../../theme';

interface TextStyleProps extends TextProps {
  variant?: keyof typeof theme.typography.fontFamily;
  size?: keyof typeof theme.typography.fontSize;
  color?: string;
}

export const TextStyle: React.FC<TextStyleProps> = ({
  children,
  variant = 'regular',
  size = 'md',
  color = theme.colors.text.primary,
  style,
  ...props
}) => {
  const fontStyle: RNTextStyle = {
    fontFamily: theme.typography.fontFamily[variant],
    fontSize: theme.typography.fontSize[size],
    color: color,
  };

  return (
    <Text style={[fontStyle, style]} {...props}>
      {children}
    </Text>
  );
};
