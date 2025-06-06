import React from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './styles';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

const MAX_CHAR_LENGTH = 256;

const PortfolioScreen: React.FC<{ initialValues: any; updateValues: (updatedValues: any) => void }> = ({ initialValues, updateValues }) => {
  const handleChange = (key: string, value: string) => {
    updateValues({ [key]: value });
  };

  return (
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
          value={initialValues.portfolioUrl1}
          onChangeText={(text) => handleChange('portfolioUrl1', text)}
          maxLength={MAX_CHAR_LENGTH}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter portfolio url 2"
          value={initialValues.portfolioUrl2}
          onChangeText={(text) => handleChange('portfolioUrl2', text)}
          maxLength={MAX_CHAR_LENGTH}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter portfolio url 3"
          value={initialValues.portfolioUrl3}
          onChangeText={(text) => handleChange('portfolioUrl3', text)}
          maxLength={MAX_CHAR_LENGTH}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter portfolio url 4"
          value={initialValues.portfolioUrl4}
          onChangeText={(text) => handleChange('portfolioUrl4', text)}
          maxLength={MAX_CHAR_LENGTH}
        />
      </View>
    </View>
  );
};

export default PortfolioScreen;