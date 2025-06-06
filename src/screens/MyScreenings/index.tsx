import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { styles } from './styles';
import { Header } from '../../components/common/Header';
import { TextStyle } from '../../components/common/Text';
import ScreeningCard from './ScreeningCard';
import CustomModal from '../../components/common/Modal';
import RescheduleBottomSheet from './RescheduleBottomSheet';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchScreeningInterviews } from '../../store/thunk/fetchScreeningInterviews.thunk';

export interface Screening {
  id: string;
  jobTitle: string;
  screeningStatus: 'CR' | 'CS' | 'CC' | 'no_response';
  jobCity: string;
  jobState: string;
  jobCountry: string;
  preferredScreeningDate: string;
  clientEnterpriseName: string;
}

export const MyScreenings = () => {

  const dispatch = useAppDispatch();

  const { items: screenings, loading, error } = useAppSelector(
    (state) => state.screeningInterviews
  );
  console.log({screenings})

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);

  const handleReschedule = (screening: Screening) => {
    setSelectedScreening(screening);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedScreening(null);
  };

  useEffect(() => {
    console.log("useEffect in MyScreenings");
  }, []);

  useEffect(() => {
    const loadScreenings = async () => {
      try {
        await dispatch(fetchScreeningInterviews({ pageFrom: 0, pageSize: 10 })).unwrap();
      } catch (err) {
        console.error("Failed to load screenings from API:", err);
      }
    };

    loadScreenings();

    // Cleanup function if needed (e.g., clear data on unmount)
    // return () => {
    //   dispatch(clearScreeningInterviewsData());
    // };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton title="My Screenings" />
      <View style={styles.headerCard}>
        <TextStyle size="xl" variant="bold">
          My Screenings ({screenings.length})
        </TextStyle>
      </View>
      <FlatList
        data={screenings}
        keyExtractor={(item) => item?.id}
        //@ts-ignore
        renderItem={({ item }) => <ScreeningCard screening={item} onReschedule={handleReschedule} />}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
      <CustomModal
        isVisible={modalVisible}
        title="Reschedule"
        onClose={handleCloseModal}
        style={{ width: '100%', padding: 16 }}
      >
        {selectedScreening && (
          //@ts-ignore
          <RescheduleBottomSheet screening={selectedScreening} onClose={handleCloseModal} />
        )}
      </CustomModal>
    </SafeAreaView>
  );
};