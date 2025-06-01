import React from "react";
import { SafeAreaView, StyleSheet, View, Image } from "react-native"; // Import Image
import { TermsPolicies } from "../../components/common/TermsPolicies";
import { CopyrightFooter } from "../../components/common/CopyrightFooter";
import { theme } from "../../theme";
import { Button } from "../../components/common/Button";
import { TextStyle } from "../../components/common/Text";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

export const RegistrationASuccessScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.mainScreen}>

      <View style={styles.body}>
        {/* Container for Lottie and foreground image */}
        <View style={styles.animationImageContainer}>
          {/* Lottie animation for success celebration (background) */}
          <LottieView
            source={require('../../../assets/animations/celebration.json')} // **MAKE SURE TO UPDATE THIS PATH** to your actual Lottie JSON file
            autoPlay // Starts the animation automatically
            loop // Keeps the animation looping
            style={styles.lottieAnimation}
          />
          {/* Foreground image (on top of Lottie) */}
					<LottieView
            source={require('../../../assets/animations/Success.json')} // **MAKE SURE TO UPDATE THIS PATH** to your actual Lottie JSON file
            autoPlay // Starts the animation automatically
            loop // Keeps the animation looping
            style={styles.foregroundImage}
          />
          {/* <Image
            source={require('../../../assets/images/SuccessIcon.png')} // **MAKE SURE TO UPDATE THIS PATH** to your actual foreground image
            style={styles.foregroundImage}
          /> */}
        </View>

        <TextStyle size="md" variant="bold" style={[styles.textStyle, styles.title]}>Registration Successful</TextStyle>
        <TextStyle size="xs" style={[styles.textStyle, styles.subText]}>You have successfully registered! You can now start searching for jobs.</TextStyle>
      </View>

      <Button
        title="Search Jobs"
        onPress={() => navigation.navigate("AppNavigator", { screen: "Search Jobs" })}
        style={styles.searchJobsBtn}
      />
      <View style={styles.footer}>
        <TermsPolicies />
        <CopyrightFooter />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    padding: theme.spacing.md,
  },
  body: {
    flex: 0.92,
    alignItems: 'center',
    justifyContent: 'center'
  },
  animationImageContainer: {
    width: 196, // Match the Lottie animation's width
    height: 158, // Match the Lottie animation's height
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    position: 'relative', // Allows absolute positioning of children
  },
  lottieAnimation: {
    width: '100%', // Make Lottie fill its container
    height: '100%', // Make Lottie fill its container
    position: 'absolute', // Position absolutely within the container
    zIndex: 0, // Ensure it's in the background
  },
  foregroundImage: {
    height: "100%", // Adjust size as needed for your foreground image
    width: "100%", // Adjust size as needed for your foreground image
    zIndex: 1, // Ensure it's on top of the Lottie animation
  },
  textStyle: {
    marginTop: 8,
    textAlign: 'center'
  },
  title: {
    fontWeight: '600'
  },
  subText: {
    width: '65%'
  },
  searchJobsBtn: {
    borderRadius: 24,
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    alignSelf: 'center',
  },
})
