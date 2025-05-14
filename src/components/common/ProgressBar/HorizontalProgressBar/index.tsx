import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../../../theme';

interface HorizontalProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  borderRadius?: number;
  style?: ViewStyle;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({
  progress,
  height = 10,
  backgroundColor = theme.colors.grey[100],
  progressColor = theme.colors.green.success_100,
  borderRadius = 5,
  style,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const width = Math.min(Math.max(progress, 0), 100);
    Animated.timing(animatedWidth, {
      toValue: width,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const interpolatedWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor, borderRadius },
        style,
      ]}
    >
      <Animated.View
        style={{
          height: '100%',
          backgroundColor: progressColor,
          width: interpolatedWidth,
          borderRadius,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
});

export default HorizontalProgressBar;
