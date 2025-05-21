import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import Icon from '../../../../components/common/Icon/Icon';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { SaveButton } from '../../../../components/features/SaveButton';

const MAX_CHAR_LENGTH = 256;

const PortfolioScreen: React.FC = () => {
  const [portfolioUrl1, setPortfolioUrl1] = useState('');
  const [portfolioUrl2, setPortfolioUrl2] = useState('');
  const [portfolioUrl3, setPortfolioUrl3] = useState('');
  const [portfolioUrl4, setPortfolioUrl4] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    if (
      portfolioUrl1.length > MAX_CHAR_LENGTH ||
      portfolioUrl2.length > MAX_CHAR_LENGTH ||
      portfolioUrl3.length > MAX_CHAR_LENGTH ||
      portfolioUrl4.length > MAX_CHAR_LENGTH
    ) {
      Alert.alert('Validation Error', `Each portfolio URL cannot exceed ${MAX_CHAR_LENGTH} characters.`);
      return;
    }

    // In a real application, you would save the portfolio URLs here.
    console.log('Portfolio URLs saved:', {
      portfolioUrl1,
      portfolioUrl2,
      portfolioUrl3,
      portfolioUrl4,
    });
    Alert.alert('Success', 'Portfolio details saved!');
    // Optionally navigate to another screen: navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Icon name='web' />
        <Text style={styles.title}>Portfolio</Text>
      </View> */}
      <ScrollView style={{flex: 1}}>
        <View style={styles.body}>
          <ProfileScreenHeader
            headerIcon='web'
            headerTitle='Portfolio'
            completedStatus={false}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter portfolio url 1"
              value={portfolioUrl1}
              onChangeText={setPortfolioUrl1}
              maxLength={MAX_CHAR_LENGTH}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter portfolio url 2"
              value={portfolioUrl2}
              onChangeText={setPortfolioUrl2}
              maxLength={MAX_CHAR_LENGTH}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter portfolio url 3"
              value={portfolioUrl3}
              onChangeText={setPortfolioUrl3}
              maxLength={MAX_CHAR_LENGTH}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter portfolio url 4"
              value={portfolioUrl4}
              onChangeText={setPortfolioUrl4}
              maxLength={MAX_CHAR_LENGTH}
            />
          </View>
      </View>
      </ScrollView>
      <View style={styles.saveButton}>
        <SaveButton
          title="Save"
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
};

export default PortfolioScreen;