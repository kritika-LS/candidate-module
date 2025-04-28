import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

const AnimatedSplash = ({ onAnimationFinish }: { onAnimationFinish: () => void }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../../assets/animations/Splash Screen.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#015CCB', // your splash background
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default AnimatedSplash;
