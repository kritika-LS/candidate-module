import React, { useState } from "react";
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
import { navigationRef } from "../../navigation/navigationRef";
import { useAuth } from "../../context/AuthContext";
import Toast from "react-native-toast-message";
import { SaveButton } from "../../components/features/SaveButton";

export const RegistrationASuccessScreen = () => {

  const { getAuthDetails } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleSearchJobsPress = async () => {
    try {
      setLoading(true);
      // Update auth state to mark user as registered
      // const result = await getAuthDetails();
      // console.log({result})

      // Navigate to main app with search jobs tab
      navigation.navigate('MainStack', {
        screen: 'AppNavigator',
        params: {
          screen: 'Search Jobs' // This matches the key in BottomTabsParamsList
        }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error updating auth state:', error);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Failed to complete registration. Please try again.'
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainScreen}>

      <View style={styles.body}>
        <View style={styles.animationImageContainer}>
          <LottieView
            source={require('../../../assets/animations/celebration.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          {/* Foreground image (on top of Lottie) */}
					<LottieView
            source={require('../../../assets/animations/Success.json')}
            autoPlay
            loop
            style={styles.foregroundImage}
          />
        </View>

        <TextStyle size="md" variant="bold" style={[styles.textStyle, styles.title]}>Registration Successful</TextStyle>
        <TextStyle size="xs" style={[styles.textStyle, styles.subText]}>You have successfully registered! You can now start searching for jobs.</TextStyle>
      </View>

      {/* <Button
        title="Search Jobs"
        onPress={handleSearchJobsPress}
        style={styles.searchJobsBtn}
      /> */}
      <SaveButton
        title="Search Jobs"
        onPress={handleSearchJobsPress}
        loading={loading}
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
    width: 196,
    height: 158,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  foregroundImage: {
    height: "100%",
    width: "100%",
    zIndex: 1,
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
