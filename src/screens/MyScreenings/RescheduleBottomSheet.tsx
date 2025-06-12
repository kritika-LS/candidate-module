import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { Input } from '../../components/common/Input';
import { theme } from '../../theme';
import Icon from '../../components/common/Icon/Icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { rescheduleInterview } from '../../store/thunk/rescheduleInterview.thunk';
import { fetchScreeningInterviews } from '../../store/thunk/fetchScreeningInterviews.thunk';
import { useNavigation } from '@react-navigation/native';
import { fetchNotifications } from '../../store/thunk/fetchNotifications.thunk';

interface RescheduleBottomSheetProps {
  screening: {
    jobTitle?: string;
    screeningStatus?: 'CR' | 'CS' | 'CC' | 'no_response';
    jobCity?: string;
    jobState?: string;
    jobCountry?: string;
    preferredScreeningDate?: string;
    clientEnterpriseName?: string;
    screeningConsentStatus?: 'Y' | 'N';
    candidatePoolId?: any;
  };
  onClose?: () => void;
  candidatePoolId?: string;
}

const RescheduleBottomSheet: React.FC<RescheduleBottomSheetProps> = ({ screening, onClose = () => {}, candidatePoolId = '' }) => {

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [dateTime, setDateTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarImg = require('../../../assets/images/Calendar.png');

  const handleSchedule = async () => {
    if (!selectedDate) {
      Toast.show({
        type: 'error',
        text1: 'Please select a preferred date and time.',
      });
      return;
    }

    const preferredScreeningDateISO = selectedDate.toISOString(); // Convert to ISO string

    const requestBody = {
      preferredScreeningDate: preferredScreeningDateISO,
      screeningConsentIpAddress: null,
      screeningConsentStatus: screening?.screeningConsentStatus || 'Y',
      candidatePoolId: screening?.candidatePoolId || candidatePoolId,
    };

    try {
      await dispatch(rescheduleInterview(requestBody)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Your interview has been successfully rescheduled.',
      });
      // Optionally, re-fetch all screenings in the parent component to update the list
      dispatch(fetchScreeningInterviews({ pageFrom: 0, pageSize: 10 }));
      dispatch(fetchNotifications()).unwrap(),
      onClose();
    } catch (err) {
      console.error("Reschedule failed:", err);
      Toast.show({
        type: 'error',
        text1: (err as Error).message || 'Reschedule Failed',
      });
    }
  };

  const handleSceduleLater = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextStyle variant="bold" size="md">
          Screening - {screening.jobTitle}
        </TextStyle>
        <View style={styles.infoRow}>
          <TextStyle style={{marginRight: 8}} leftIcon="office-building-outline" iconColor={theme.colors.green.accent} size="xs" color={theme.colors.green.accent}>
            {screening.clientEnterpriseName}
          </TextStyle>
          <TextStyle leftIcon="map-marker-outline" size="xs" color={theme.colors.text.secondary} style={{  }}>
            {`${screening.jobCity}, ${screening.jobState}, ${screening.jobCountry}`}
          </TextStyle>
        </View>
        <View style={styles.illustrationWrapper}>
          <Image source={calendarImg} style={styles.illustration} resizeMode="contain" />
        </View>
        <View style={styles.rowCenter}>
          <TextStyle leftIcon="clock-outline" size="xs" color={theme.colors.text.secondary} style={{ marginRight: 16 }}>
            Approximately 10-15 mins
          </TextStyle>
          <TextStyle leftIcon="file-document-outline" size="xs" color={theme.colors.text.secondary}>
            Approximately 5-10 questions
          </TextStyle>
        </View>
        <TextStyle size="xs" color={theme.colors.text.secondary} style={{ marginTop: 8, marginBottom: 8 }}>
          Schedule your screening by choosing date and time that works best for you
        </TextStyle>
        <Input
          label="Date and Time"
          required
          value={selectedDate ? moment(selectedDate).format('MM/DD/YYYY hh:mm a') : ''}
          placeholder="Select date and time"
          rightIcon={<TouchableOpacity onPress={() => setShowDatePicker(true)}><Icon name="calendar" size={20} color={theme.colors.primary.main} /></TouchableOpacity>}
          // onFocus={() => setShowPicker(true)}
          editable={false}
          style={{ fontSize: 14 }}
        />
      </View>
      <View style={styles.flexRow}>
        {candidatePoolId && <TouchableOpacity onPress={handleSceduleLater} style={styles.scheduleBtn}>
          <TextStyle size="sm" variant="bold" color="#fff">Schedule Later</TextStyle>
        </TouchableOpacity>}
        <TouchableOpacity onPress={handleSchedule} style={styles.scheduleBtn}>
          <TextStyle size="sm" variant="bold" color="#fff">Schedule</TextStyle>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date(Date.now() + 60 * 60 * 1000)}
          mode="date"
          minimumDate={new Date(Date.now() + 60 * 60 * 1000)}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              // Set date, keep time if already selected
              const newDate = new Date(date);
              if (selectedDate) {
                newDate.setHours(selectedDate.getHours());
                newDate.setMinutes(selectedDate.getMinutes());
              }
              setSelectedDate(newDate);
              setShowTimePicker(true); // Open time picker next
            }
          }}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={selectedDate || new Date(Date.now() + 60 * 60 * 1000)}
          mode="time"
          onChange={(event, time) => {
            setShowTimePicker(false);
            if (time) {
              // Set time, keep date
              const newDate = new Date(selectedDate || new Date());
              newDate.setHours(time.getHours());
              newDate.setMinutes(time.getMinutes());
              setSelectedDate(newDate);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%',
    // flexWrap: 'wrap'
  },
  card: {
    // backgroundColor: '#fff',
    borderRadius: 12,
    // padding: 16,
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
    marginBottom: 16,
    // width: 340,
    alignSelf: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flexWrap: 'wrap'
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  illustration: {
    width: 120,
    height: 100,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  scheduleBtn: {
    backgroundColor: theme.colors.primary.main,
    borderRadius: 8,
    // alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginRight: 12,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default RescheduleBottomSheet; 