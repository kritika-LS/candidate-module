import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HistoryListCard from '../../../components/features/HistoryListCard';
import { theme } from '../../../theme';
import { TextStyle } from '../../../components/common/Text';
import { styles } from './styles';
import { AddEducationForm } from './AddEducationForm';
import { useAppSelector } from '../../../hooks/useAppDispatch';

const EducationSection = () => {

    const EducationHistoryData = useAppSelector((state) => state?.candidateEducation?.educations?.responsePayload) || {};

    const [showHistoryList, setShowHistoryList] = useState(true);
    const [expandedItem, setExpandedItem] = useState<string | null>('Work History'); // Set default expanded item

    const accordionData = [
        {
            title: 'Education',
            icon: 'school', // Add the icon property
            content: (
                <View style={styles.accordionContent}>
                    <AddEducationForm />
                </View>
            )
        },
    ];

    console.log('EducationHistoryData', EducationHistoryData);

    return (
        <ScrollView style={styles.sectionContainer}>
            {showHistoryList || EducationHistoryData.length > 0 ? 
                        <>
                            <HistoryListCard
                                listIcon={'bookshelf'}
                                title='Bachelor of Science in Nursing '
                                subtitle1='Bachelors'
                                subtitle2='Full-Time'
                                workSpaceName='Sapphire School of Medical Sciences'
                                startDate='Dec 20, 2019'
                                endDate='Oct 20, 2024'
                                location='Pembroke Pines, Illinois, US'
                                onEdit={() => console.log('Edit pressed')}
                                onDelete={() => console.log('Delete pressed')}
                            />
                            <TouchableOpacity
                                style={styles.addWorkHistoryContainer}
                                onPress={() => setShowHistoryList(false)}
                            >
                                <Icon name="add" size={20} color={theme.colors.primary.main} />
                                <TextStyle color={theme.colors.primary.main} style={styles.addWorkHistoryText}>Add Education</TextStyle>
                            </TouchableOpacity>
                        </>
                        :
                        <AddEducationForm />
            }
        </ScrollView>
    );
};

export default EducationSection;
