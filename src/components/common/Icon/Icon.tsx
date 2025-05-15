import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  return <MaterialIcons name={name} size={size} color={color} style={style} />;
};

export default Icon;
