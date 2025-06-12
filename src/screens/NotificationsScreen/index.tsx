import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Header } from '../../components/common/Header';
import { TextStyle } from '../../components/common/Text';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { markAllNotificationsAsRead } from '../../store/thunk/markAllNotificationsAsRead.thunk';
import Toast from 'react-native-toast-message';
import { formatTime } from '../../utils/formatTime';
import { readNotification } from '../../store/thunk/readNotification.thunk';
import { fetchScreeningDetails } from '../../store/thunk/fetchScreeningDetails.thunk';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { items: notifications, loading: notificationsLoading, error: notificationsError } = useAppSelector(
    (state) => state.notifications
  );

  const { count: unreadCount } = useAppSelector((state) => state.unreadNotificationsCount);

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(markAllNotificationsAsRead()).unwrap();
      Toast.show({
        type: 'success',
        text1: 'All notifications marked as read!',
      });
    } catch (err) {
      console.error("Error marking all as read:", err);
      Toast.show({
        type: 'error',
        text1: (err as Error).message || 'Failed to mark all as read.',
      });
    }
  };

  const extractCandidatePoolId = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      const encodedParams = parsedUrl.searchParams.get('params');
  
      if (!encodedParams) return null;
  
      const decodedParams = atob(encodedParams); // decode base64
      const match = decodedParams.match(/candidatePoolId=(\d+)/);
  
      return match ? match[1] : null;
    } catch (error) {
      console.error('Failed to extract candidatePoolId:', error);
      return null;
    }
  };  

  const handleReadNotification = async (notificationId: string) => {
    try {
      await dispatch(readNotification(notificationId)).unwrap();
      // Toast.show({ type: 'success', text1: 'Notification marked as read!' });
    } catch (err) {
      console.error(`Error marking notification ${notificationId} as read:`, err);
      // Toast.show({ type: 'error', text1: (err as Error).message || 'Failed to mark notification as read.' });
    }
  };

  const renderNotification = ({ item }: any) => {

    const notificationTime = formatTime(item?.createdTimestamp);
    const notificationRead = item?.notificationStatus === 'R';

    const handleNotificationPress = async() => {
      if(!notificationRead) handleReadNotification(item.notificationId);
      const candidatePoolId = extractCandidatePoolId(item?.callToActionUrl || '');
      if (candidatePoolId) {
        try {
          await dispatch(fetchScreeningDetails(candidatePoolId)).unwrap();
          // Optionally navigate to the screening details screen after successful fetch
          //@ts-ignore
          navigation.navigate("ScreeningScheduler", {
            candidatePoolId: candidatePoolId,
          });
        } catch (error) {
          console.error("Failed to fetch screening details:", error);
          Toast.show({
            type: 'error',
            text1: `Failed to open details: ${(error as Error).message || 'Unknown error'}`
          });
        }
      } else {
        console.warn("Could not extract candidatePoolId from URL:", item?.callToActionUrl);
        // Toast.show({
        //   type: 'info',
        //   text1: 'No specific details link available for this notification.'
        // });
      }
    }

    return(
    <TouchableOpacity onPress={handleNotificationPress} activeOpacity={0.7} style={[styles.notificationCard, !notificationRead && styles.highlightCard]}>
      <TextStyle variant={notificationRead ? 'regular' : 'bold'} size="sm" style={styles.message}>{item?.notificationValue}</TextStyle>
      <View style={styles.rowBetween}>
        <TextStyle size="xs" color={theme.colors.text.light}>{notificationTime}</TextStyle>
        
      </View>
    </TouchableOpacity>
  )};

  if(!notifications.length) return(
    <View style={styles.container}>
      <Header showBackButton title="Notifications" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextStyle size="sm" color={theme.colors.text.light}>No notifications available.</TextStyle>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Header showBackButton title="Notifications" count={unreadCount} />
      { unreadCount > 0 &&
        <View style={styles.markAllContainer}>
          <TouchableOpacity onPress={handleMarkAllAsRead}>
            <TextStyle size="sm" color={theme.colors.primary.main}>Mark all as read</TextStyle>
          </TouchableOpacity>
        </View>
      }
      <FlatList
        data={notifications}
        keyExtractor={item => item.notificationId}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationsScreen; 