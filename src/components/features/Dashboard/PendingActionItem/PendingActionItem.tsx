import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../../common/Text';
import { theme } from '../../../../theme';
import { useNavigation } from '@react-navigation/native';
import { BottomTabsParamsList } from '../../../../types/navigation';

interface Props {
  text: string;
  item?: any;
  targetScreen: string;
  targetTabIndex?: number;
}

const PendingActionItem: React.FC<Props> = ({ text, item, targetScreen, targetTabIndex }) => {

  const navigation = useNavigation<BottomTabsParamsList>();

  const handlePress = () => {
    navigation.navigate('Profile', { screen: targetScreen, initialTabIndex: targetTabIndex });
  };

  return(
    <View style={styles.container}>
      <TextStyle style={styles.text} size='xs'>{text}</TextStyle>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <TextStyle style={styles.buttonText}>View</TextStyle>
      </TouchableOpacity>
    </View>
)};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    flex: 0.9,
  },
  button: {
    paddingHorizontal: 20,
    // paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: theme.colors.primary.main,
    height: 24
  },
  buttonText: {
    color: theme.colors.primary.main,
  },
});

export default PendingActionItem;