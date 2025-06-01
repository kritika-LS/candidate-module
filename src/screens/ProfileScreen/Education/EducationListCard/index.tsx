import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from '../../../../components/common/Icon/Icon';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';
import Chip from '../../../../components/common/Chip';

interface HistoryListCardProps {
  title: string;
  subtitle1?: string;
  subtitle2?: string;
  universityName: string;
  ratio?: string;
  startDate: string;
  endDate: string;
  onEdit?: () => void;
  onDelete?: () => void;
  listIcon?: string;
  pillText?: string;
  levelOfEducation?: string;
  modeOfEducation?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

const EducationListCard: React.FC<HistoryListCardProps> = ({
  title,
  subtitle1,
  universityName,
  ratio,
  startDate,
  endDate,
  onEdit,
  onDelete,
  listIcon,
  pillText,
  levelOfEducation,
  modeOfEducation,
  address,
  city,
  state,
  country,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {listIcon ? (
          <View style={styles.defaultIcon}>
            <Icon name={listIcon} size={20} color={theme.colors.blue.light} />
          </View>
        ) : (
          <View style={styles.defaultIcon}>
            <TextStyle style={styles.defaultIconText}>🏥</TextStyle>
          </View>
        )}

        <View style={styles.titleContainer}>
          <View style={[styles.flexRow]}>
            <TextStyle
              size="sm"
              color={theme.colors.text.heading}
              variant="bold"
              style={styles.title}
            >
              {title}
            </TextStyle>
            {pillText && <Chip chipName={pillText} status="completed" />}
          </View>

          {subtitle1 && (
            <TextStyle size="sm" color={theme.colors.text.light}>
              {subtitle1}
            </TextStyle>
          )}
        </View>
      </View>

      {(onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
              <Icon
                name="square-edit-outline"
                size={20}
                color={theme.colors.blue.light}
              />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
              <Icon name="trash-can-outline" size={20} color="#dc3545" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.experienceDetailsCard}>
        <TextStyle
          leftIcon="town-hall"
          size="sm"
          variant="bold"
        >
          {universityName}
        </TextStyle>

        <View style={styles.flexWrapRow}>
          {!!levelOfEducation && (
            <View style={styles.detailItem}>
              <TextStyle
                leftIcon="school-outline"
                size="xs"
                color={theme.colors.text.light}
              >
                Level:{' '}
                <TextStyle size="xs" variant="bold">
                  {(levelOfEducation === "S" && "School" || levelOfEducation)}
                </TextStyle>
              </TextStyle>
            </View>
          )}

          {!!modeOfEducation && (
            <View style={styles.detailItem}>
              <TextStyle
                leftIcon="file-document-outline"
                size="xs"
                color={theme.colors.text.light}
              >
                Mode:{' '}
                <TextStyle size="xs" variant="bold">
                  {(modeOfEducation == "F" && 'Full Time' || modeOfEducation)}
                </TextStyle>
              </TextStyle>
            </View>
          )}

          {!!startDate && !!endDate && (
            <View style={styles.detailItem}>
              <TextStyle
                leftIcon="calendar-range"
                size="xs"
                color={theme.colors.text.light}
              >
                Duration:{' '}
                <TextStyle size="xs" variant="bold">
                  {`${startDate} - ${endDate}`}
                </TextStyle>
              </TextStyle>
            </View>
          )}

          <View style={styles.detailItem}>
            <TextStyle
              leftIcon="map-marker-outline"
              size="xs"
              color={theme.colors.text.light}
            >
              Location:{' '}
              <TextStyle size="xs" variant="bold">
                {`${address || ''}, ${city}, ${state}, ${country}`}
              </TextStyle>
            </TextStyle>
          </View>

        </View>
      </View>

    </View>
  );
};

export default EducationListCard;
