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
  onBackPress?: () => void;
  count?: any;
}

export const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  title,
  onBackPress,
  count = '',
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.safeArea}>
      {/* <StatusBar
        backgroundColor={theme.colors.primary.main}
        barStyle="light-content"
      /> */}
      <View style={styles.container}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress ? onBackPress : () => navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={18}
              color={theme.colors.text.white}
            />
          </TouchableOpacity>
        )}

        {/* {showBackButton ? ( */}
          <TextStyle variant="medium" size="lg" style={styles.title}>
            {/* {title} {count && {count}} */}
            {`${title} ${count && '(' + count +')'}`}
          </TextStyle>
        {/* ) : null
        // (
        //   <View style={styles.logoContainer}>
        //     <Image
        //       source={require('../../../assets/logo/logo.png')}
        //       style={styles.logo}
        //       resizeMode="contain"
        //     />
        //   </View>
        // )
        } */}
      </View>
    </View>
  );
};
