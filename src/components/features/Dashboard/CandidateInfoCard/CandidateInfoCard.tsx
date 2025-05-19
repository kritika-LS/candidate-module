import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TextStyle } from '../../../common/Text';
import { styles } from './styles';
import Icon from '../../../common/Icon/Icon';
import HorizontalProgressBar from '../../../common/ProgressBar/HorizontalProgressBar';
import { theme } from '../../../../theme';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../../hooks/useAppDispatch';

interface CandidateInfoCardProps {
  showCompleteButton?: boolean;
}

const CandidateInfoCard: React.FC<CandidateInfoCardProps> = ({
  showCompleteButton = true,
}) => {
    const navigation = useNavigation();
    const candidateData = useAppSelector((state) => state?.candidate?.candidate?.responsePayload);

    // Safely extract data with default empty strings
    const firstName = candidateData?.firstName || '';
    const lastName = candidateData?.lastName || '';
    const mobileNumber = candidateData?.mobileNumber || '';
    const emailAddress = candidateData?.emailAddress || '';

    // Safely get initials
    const initials = firstName && lastName ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}` : '';

    const handleComplete = () => {
        navigation.navigate('Profile', { initialTabIndex: 1 });
    }

    return (
        <View style={styles.card}>
            <View style={styles.candidateInfoSection}>
                <View style={styles.initialsCard}>
                    <TextStyle size='md'>{initials}</TextStyle>
                </View>
                <View style={styles.candidiateInfo}>
                    <TextStyle size='sm' style={styles.name}>{firstName} {lastName}</TextStyle>
                    <TextStyle size='xs' style={styles.role}>Registered Nurse</TextStyle>
                    <View style={styles.contactInfo}>
                        <View style={styles.contactDetails}>
                            <Icon name='email-outline' size={10} color={theme.colors.primary.main} />
                            <TextStyle style={styles.email}>{emailAddress}</TextStyle>
                        </View>
                        <View style={styles.contactDetails}>
                            <Icon name='cellphone' size={10} color={theme.colors.primary.main} />
                            <TextStyle style={styles.phone}>{mobileNumber}</TextStyle>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.progressBarContainer}>
                <View style={styles.progressHeading}>
                    <TextStyle size='xs'>Profile Completion</TextStyle>
                    <TextStyle size='xs' variant='bold'>60%</TextStyle>
                </View>
                <HorizontalProgressBar progress={60} style={{ height: 10 }} />
            </View>
            {showCompleteButton && (
                <TouchableOpacity style={styles.button} onPress={handleComplete}>
                    <TextStyle style={styles.buttonText} size='xs'>Complete</TextStyle>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CandidateInfoCard;