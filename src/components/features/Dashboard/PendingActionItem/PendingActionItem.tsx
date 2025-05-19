import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../../common/Text';
import { theme } from '../../../../theme';

interface Props {
  text: string;
}

const PendingActionItem: React.FC<Props> = ({ text }) => {
  return(
    <View style={styles.container}>
      <TextStyle style={styles.text} size='xs'>{text}</TextStyle>
      <TouchableOpacity style={styles.button}>
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