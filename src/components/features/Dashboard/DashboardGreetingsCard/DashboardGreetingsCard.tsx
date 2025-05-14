import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { getGreeting } from '../../../../utils/getGreeting';

interface GreetingsCardProps {
  firstName: string;
  lastName: string;
}

const DashboardGreetingsCard: React.FC<GreetingsCardProps> = ({
  firstName = 'Jane',
  lastName = 'Cooper',
}) => {

  const fullName = `${firstName} ${lastName}`;
  const greeting = `${getGreeting()}, ${fullName}!`;

  return(
    <ImageBackground
      source={require('../../../../../assets/images/dashboardGreetingBg.png')} // your background image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.greeting}>{`${greeting} 👋`}</Text>
        <Text style={styles.subtext}>Discover new opportunities and take the next step in your career</Text>
      </View>
    </ImageBackground>
)}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
	backgroundImage: {
		width: "100%",
    height: Dimensions.get('screen').height*0.14,
		justifyContent: 'center',
	},
});

export default DashboardGreetingsCard;
