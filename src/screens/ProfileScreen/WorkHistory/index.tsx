import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HistoryListCard from '../../../components/features/HistoryListCard';
import AddWorkHistory from './AddWorkForm';
import { theme } from '../../../theme';
import { TextStyle } from '../../../components/common/Text';
import { useAppSelector } from '../../../hooks/useAppDispatch';
import { PrimaryMenu } from '../../../components/common/PrimaryMenu';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import WorkHistoryListCard from './WorkHistoryListCard';

const WorkHistorySection:React.FC = () => {

    const navigation = useNavigation();

    const WorkHistoryData = useAppSelector((state) => state?.candidateWorkHistory?.workHistory?.responsePayload) || [];

    const [showHistoryList, setShowHistoryList] = useState(true);
    const [showForm, setShowForm] = useState<boolean>(false); // Set default expanded item

    const handleAddWorkHistoryPress = () => {
        setShowForm(true);
    };

    console.log({WorkHistoryData})

    return (
        <ScrollView style={styles.sectionContainer}>
            {showHistoryList || WorkHistoryData.length ? (
                        <>
                            {/* <HistoryListCard
                                listIcon={'briefcase-outline'}
                                title={WorkHistoryData[0]?.title}
                                subtitle1='ICU'
                                subtitle2='Trauma Hospital'
                                workSpaceName='Springfield Memorial Hospital - 867567'
                                ratio='1:4'
                                startDate='Jan 2020'
                                endDate='Present'
                                location='New York, NY'
                                pillText={'Travel'}
                                onEdit={() => console.log('Edit pressed')}
                                onDelete={() => console.log('Delete pressed')}
                            /> */}
                            {WorkHistoryData.map((item:any, index:number) => {
                                const startDate = moment(item?.workedFrom).format('MMM, YYYY');
                                const endDate = item?.workedTill == 'present' ? 'Present' : moment(item?.workedTill).format('MMM, YYYY');
                                const pillText = item?.workedTill == 'present' ? 'Current' : '';
                                return(
                                    <WorkHistoryListCard
                                        key={index}
                                        listIcon={'briefcase-outline'}
                                        title={item.title}
                                        subtitle1={'Work experience details'}
                                        workSpaceName={item.workedWith || 'Facility Name'}
                                        skillsWorked={item?.skillsWorked || ''}
                                        businessType={item?.typeOfBusiness || ''}
                                        ratio={item?.additionalDetails?.[0]?.nurseToPatientRatio || '-'}
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
                            )})}
                            { !showForm && <TouchableOpacity
                                style={styles.addWorkHistoryContainer}
                                onPress={handleAddWorkHistoryPress}
                            >
                                <Icon name="add" size={16} color={theme.colors.primary.main} />
                                <TextStyle color={theme.colors.primary.main} style={styles.addWorkHistoryText} size='sm'>Add Work History</TextStyle>
                            </TouchableOpacity>}
                        </>
            ) : null
            }
            { showForm &&
                <AddWorkHistory setShowForm={setShowForm} />
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        padding: 16,
    },
    accordionContent: {
		// paddingHorizontal: 16,
		paddingVertical: 8,
	},
    addWorkHistoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        justifyContent: 'flex-end',
    },
    addWorkHistoryText: {
        marginLeft: 4,
    },
    accordionItem: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accordionTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpacing: {
        marginLeft: 8,
    },
});

export default WorkHistorySection;
