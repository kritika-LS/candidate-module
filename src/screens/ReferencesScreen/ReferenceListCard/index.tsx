import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from '../../../components/common/Icon/Icon';
import { TextStyle } from '../../../components/common/Text';
import { theme } from '../../../theme';
import Chip from '../../../components/common/Chip';

interface ReferenceListCardProps {
  title: string;
  subtitle1?: string;
  listIcon?: string;
  organizationName: string;
  phoneNumber: string;
  email: string;
  contactPermission?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ReferenceListCard: React.FC<ReferenceListCardProps> = ({
  title,
  subtitle1,
  organizationName,
  phoneNumber,
  email,
  contactPermission,
  listIcon,
  onEdit,
  onDelete,
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
            {/* {pillText && <Chip chipName={pillText} status="completed" />} */}
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
          leftIcon="office-building-outline"
          size="sm"
          variant="bold"
        >
          {organizationName}
        </TextStyle>

        <View style={styles.flexWrapRow}>
          {!!phoneNumber && (
            <View style={styles.detailItem}>
              <TextStyle
                leftIcon="school-outline"
                size="xs"
                color={theme.colors.text.light}
              >
                Phone:{' '}
                <TextStyle size="xs" variant="bold">
                  {phoneNumber}
                </TextStyle>
              </TextStyle>
            </View>
          )}

          {!!email && (
            <View style={styles.detailItem}>
              <TextStyle
                leftIcon="file-document-outline"
                size="xs"
                color={theme.colors.text.light}
              >
                Mode:{' '}
                <TextStyle size="xs" variant="bold">
                  {email}
                </TextStyle>
              </TextStyle>
            </View>
          )}

          {!!contactPermission && (
            <View style={styles.detailItem}>
              <TextStyle
                leftIcon="calendar-range"
                size="xs"
                color={theme.colors.text.light}
              >
                Contact Permission:{' '}
                <TextStyle size="xs" variant="bold">
                  {contactPermission}
                </TextStyle>
              </TextStyle>
            </View>
          )}

        </View>
      </View>

    </View>
  );
};

export default ReferenceListCard;
