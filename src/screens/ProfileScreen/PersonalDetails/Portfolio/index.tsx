import React, { useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import { styles } from './styles';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

const MAX_CHAR_LENGTH = 256;

const PortfolioScreen: React.FC<{
  initialValues: any;
  updateValues: (updatedValues: any) => void;
  errors: any;
  touched: any;
  updateErrors: (updatedErrors: any) => void;
  updateTouched: (updatedTouched: any) => void;
}> = ({ initialValues, updateValues, errors, touched, updateErrors, updateTouched }) => {
  const [isCompleted, setIsCompleted] = React.useState(false);

  const handleChange = (key: string, value: string) => {
    updateValues({ [key]: value });
    if (touched[key]) {
      const error = validateField(key, value);
      updateErrors({ [key]: error });
    }
  };

  const handleBlur = (key: string) => {
    updateTouched({ [key]: true });
    const error = validateField(key, initialValues[key]);
    updateErrors({ [key]: error });
  };

  const validateField = (key: string, value: string) => {
    let error = '';
    if (!value) {
      error = 'Portfolio URL is required';
    } else if (!/^https?:\/\/[^\s]+$/.test(value)) {
      error = 'Invalid URL format';
    }
    return error;
  };

  useEffect(() => {
    const allUrls = [
      initialValues.portfolioUrl1,
      initialValues.portfolioUrl2,
      initialValues.portfolioUrl3,
      initialValues.portfolioUrl4,
    ];
    const allValid = allUrls.every((url) => !validateField('portfolioUrl', url));
    setIsCompleted(allValid);
  }
  , [initialValues]);

  return (
    <View style={styles.body}>
      <ProfileScreenHeader
        headerIcon="web"
        headerTitle="Portfolio"
        completedStatus={isCompleted}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter portfolio url 1"
          value={initialValues.portfolioUrl1}
          onChangeText={(text) => handleChange('portfolioUrl1', text)}
          onBlur={() => handleBlur('portfolioUrl1')}
          maxLength={MAX_CHAR_LENGTH}
        />
        {touched?.portfolioUrl1 && errors?.portfolioUrl1 && (
          <Text style={styles.errorText}>{errors.portfolioUrl1}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter portfolio url 2"
          value={initialValues.portfolioUrl2}
          onChangeText={(text) => handleChange('portfolioUrl2', text)}
          onBlur={() => handleBlur('portfolioUrl2')}
          maxLength={MAX_CHAR_LENGTH}
        />
        {touched?.portfolioUrl2 && errors?.portfolioUrl2 && (
          <Text style={styles.errorText}>{errors.portfolioUrl2}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter portfolio url 3"
          value={initialValues.portfolioUrl3}
          onChangeText={(text) => handleChange('portfolioUrl3', text)}
          onBlur={() => handleBlur('portfolioUrl3')}
          maxLength={MAX_CHAR_LENGTH}
        />
        {touched?.portfolioUrl3 && errors?.portfolioUrl3 && (
          <Text style={styles.errorText}>{errors.portfolioUrl3}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter portfolio url 4"
          value={initialValues.portfolioUrl4}
          onChangeText={(text) => handleChange('portfolioUrl4', text)}
          onBlur={() => handleBlur('portfolioUrl4')}
          maxLength={MAX_CHAR_LENGTH}
        />
        {touched?.portfolioUrl4 && errors?.portfolioUrl4 && (
          <Text style={styles.errorText}>{errors.portfolioUrl4}</Text>
        )}
      </View>
    </View>
  );
};

export default PortfolioScreen;