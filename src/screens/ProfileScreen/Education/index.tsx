import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HistoryListCard from '../../../components/features/HistoryListCard';
import { theme } from '../../../theme';
import { TextStyle } from '../../../components/common/Text';
import { styles } from './styles';
import { AddEducationForm } from './AddEducationForm';
import { useAppSelector } from '../../../hooks/useAppDispatch';
import moment from 'moment';
import EducationListCard from './EducationListCard';

const EducationSection = () => {

    const EducationHistoryData = useAppSelector((state) => state?.candidateEducation?.educations?.responsePayload) || [];

    const [showHistoryList, setShowHistoryList] = useState(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    console.log('EducationHistoryData', EducationHistoryData);

    return (
        <ScrollView style={styles.sectionContainer}>
            {showHistoryList || EducationHistoryData.length > 0 ?
                <>
                    {EducationHistoryData.map((item: any, index: number) => {
                        const startDate = moment(item?.joinedWhen).format('MMM, YYYY');
                        const endDate = item?.graduationStatus == 'No' ? 'Present' : moment(item?.certifiedWhen).format('MMM, YYYY');
                        const pillText = item?.graduationStatus == 'No' ? 'Currently Studying' : item?.graduationStatus;
                        return (
                            <EducationListCard
                                key={index}
                                listIcon={'briefcase-outline'}
                                title={item.nameOfDegree}
                                subtitle1={'Education credentials and details'}
                                universityName={item.universityName || '-'}
                                levelOfEducation={item?.levelOfEducation || ''}
                                modeOfEducation={item?.modeOfEducation || ''}
                                startDate={startDate || '-'}
                                endDate={endDate || '-'}
                                address={item.address}
                                city={item.city}
                                state={item.state}
                                country={item.country}
                                pillText={pillText}
                                onEdit={() => console.log('Edit pressed', item)}
                                onDelete={() => console.log('Delete pressed', item)}
                            />
                        )
                    })}
                    { !showForm && <TouchableOpacity
                        style={styles.addWorkHistoryContainer}
                        onPress={() => setShowForm(true)}
                    >
                        <Icon name="add" size={16} color={theme.colors.primary.main} />
                        <TextStyle color={theme.colors.primary.main} style={styles.addWorkHistoryText} size='sm'>Add Education</TextStyle>
                    </TouchableOpacity>
                    }
                </>
                : null
            }
            {showForm &&
                <AddEducationForm setShowForm={setShowForm} />
            }
        </ScrollView>
    );
};

export default EducationSection;
