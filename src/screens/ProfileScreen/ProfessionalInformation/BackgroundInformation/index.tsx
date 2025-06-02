import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import styles from './styles';
import CustomModal from '../../../../components/common/Modal';
import { TextStyle } from '../../../../components/common/Text';
import { theme } from '../../../../theme';

const questions = [
  {
    key: 'liability',
    label: 'Have you ever been named as defendant in a professional liability action?',
  },
  {
    key: 'license',
    label: 'Has any action ever been taken regarding your professional license?',
  },
] as const;

type QuestionKey = typeof questions[number]['key'];

type Answers = {
  [K in QuestionKey]: 'Yes' | 'No';
};

const defaultAnswers: Answers = {
  liability: 'No',
  license: 'No',
};

const BackgroundInformation: React.FC = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [saved, setSaved] = useState(true);
  const [status, setStatus] = useState<'Completed' | 'Incomplete'>('Completed');
  const [modalVisible, setModalVisible] = useState(false);

  // Update status
  useEffect(() => {
    const incomplete = questions.some(
      (q) => answers[q.key] !== 'Yes' && answers[q.key] !== 'No'
    );
    setStatus(incomplete ? 'Incomplete' : 'Completed');
  }, [answers]);

  // Mark as unsaved on change
  useEffect(() => {
    if (!saved) return;
    setSaved(false);
  }, [answers]);

  // Handle navigation away with unsaved changes using CustomModal
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!saved) {
          setModalVisible(true);
          return true; // Prevent default back action
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    //   return () =>
    //     BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [saved])
  );

  // Save handler
  const handleSave = () => {
    setSaved(true);
    setModalVisible(false);
    // Show success message (can use Toast or Alert if needed)
    // Alert.alert('Success', 'Professional Details saved successfully');
    // Optionally, navigate back after save
    navigation.goBack();
  };

  // Radio button handler
  const handleSelect = (key: QuestionKey, value: 'Yes' | 'No') => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Handle "No" in modal
  const handleModalNo = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.body}>
          <ProfileScreenHeader
            headerIcon='shield-check-outline'
            headerTitle='Background Information'
            completedStatus={status === 'Completed'}
          />
          {questions.map((q) => (
            <View key={q.key} style={{ marginBottom: 24 }}>
              <Text style={styles.question}>
                {q.label} <Text style={{ color: 'red' }}>*</Text>
              </Text>
              <View style={styles.radioRow}>
                {(['Yes', 'No'] as const).map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.radioButton}
                    onPress={() => handleSelect(q.key, option)}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        answers[q.key] === option && styles.radioOuterSelected,
                      ]}
                    >
                      {answers[q.key] === option && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.radioLabel}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

      <CustomModal
        isVisible={modalVisible}
        title="Unsaved Changes"
        onClose={() => setModalVisible(false)}
        primaryButtonText="Save"
        secondaryButtonText="No"
        onPrimaryPress={handleSave}
        onSecondaryPress={handleModalNo}
      >
        <TextStyle size='xs' color={theme.colors.text.light} style={{ width: "80%" }}>
          You have unsaved changes. Do you want to save before exiting?
        </TextStyle>
      </CustomModal>
    </SafeAreaView>
  );
};

export default BackgroundInformation;