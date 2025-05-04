import React from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextStyle} from '../Text';
import {styles} from './styles';
import {theme} from '../../../theme';
import Icon from '../Icon/Icon';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  title,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={theme.colors.primary.main}
        barStyle="light-content"
      />
      <View style={styles.container}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon
              name="west"
              size={18}
              color={theme.colors.text.white}
            />
          </TouchableOpacity>
        )}

        {showBackButton ? (
          <TextStyle variant="medium" size="lg" style={styles.title}>
            {title}
          </TextStyle>
        ) : null
        // (
        //   <View style={styles.logoContainer}>
        //     <Image
        //       source={require('../../../assets/logo/logo.png')}
        //       style={styles.logo}
        //       resizeMode="contain"
        //     />
        //   </View>
        // )
        }
      </View>
    </SafeAreaView>
  );
};
