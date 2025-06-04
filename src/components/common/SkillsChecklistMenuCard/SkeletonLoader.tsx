import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../../../theme';

export const SkillsChecklistMenuCardSkeleton = () => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.menuCard}>
      <Animated.View style={[styles.iconContainer, { opacity }]} />
      <View style={styles.textContainer}>
        <Animated.View style={[styles.titleSkeleton, { opacity }]} />
        <Animated.View style={[styles.subtitleSkeleton, { opacity }]} />
      </View>
      <Animated.View style={[styles.chipSkeleton, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  menuCard: {
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    backgroundColor: theme.colors.text.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: theme.colors.grey[200],
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  titleSkeleton: {
    height: 16,
    width: '80%',
    backgroundColor: theme.colors.grey[200],
    borderRadius: 4,
  },
  subtitleSkeleton: {
    height: 12,
    width: '60%',
    backgroundColor: theme.colors.grey[200],
    borderRadius: 4,
  },
  chipSkeleton: {
    width: 60,
    height: 24,
    backgroundColor: theme.colors.grey[200],
    borderRadius: 12,
  },
}); 