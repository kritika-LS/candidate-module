import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import Chip from '../../components/common/Chip';
import { theme } from '../../theme';
import moment from 'moment';
import { Screening } from '.';

interface ScreeningCardProps {
  screening: Screening;
  onReschedule?: (screening: Screening) => void;
}

const statusMap = {
  CC: { chipName: 'Completed', status: 'success' as const, showDot: true },
  CR: { chipName: 'Rescheduled', status: 'warning' as const, showDot: true },
  CS: { chipName: 'Started', status: undefined, showDot: false },
};

const ScreeningCard: React.FC<ScreeningCardProps> = ({ screening, onReschedule }) => {
  const { jobTitle, screeningStatus, jobCity, jobState, jobCountry, preferredScreeningDate, clientEnterpriseName } = screening;
  //@ts-ignore
  const statusProps = statusMap[screeningStatus];
  const formattedDate = moment(preferredScreeningDate).format('MMM DD, YYYY [at] hh:mm A');

  console.log({formattedDate})

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <TextStyle variant="bold" size="md">{jobTitle}</TextStyle>
        <Chip
          chipName={statusProps.chipName}
          status={statusProps.status}
          showDot={statusProps.showDot}
          showBorder
        />
      </View>
      <View style={styles.infoRow}>
        <TextStyle leftIcon='office-building-outline' iconColor={theme.colors.green.accent} size="sm" color={theme.colors.green.accent}>
          {clientEnterpriseName || '-'}
        </TextStyle>
      </View>
      
      <View style={styles.infoRow}>
        <TextStyle leftIcon="map-marker-outline" size="sm" color={theme.colors.text.secondary}>
          {`${jobCity}, ${jobState}, ${jobCountry}` || '-'}
        </TextStyle>
      </View>
      <View style={styles.infoRow}>
        <TextStyle leftIcon="calendar-clock" size="sm" color={theme.colors.text.secondary}>
          {formattedDate || '-'}
        </TextStyle>
      </View>
      {(screeningStatus === 'CR' || screeningStatus === 'no_response') && (
        <TouchableOpacity style={styles.rescheduleBtn} onPress={() => onReschedule?.(screening)}>
          <TextStyle size="md" variant="bold" color="#fff">Reschedule</TextStyle>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rescheduleBtn: {
    marginTop: 16,
    backgroundColor: theme.colors.primary.main,
    borderRadius: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});

export default ScreeningCard; 