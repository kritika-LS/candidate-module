import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationsReadOneService } from '../../api/services/notificationsReadOne.service';
import {
  markNotificationAsReadStart,
  markNotificationAsReadSuccess,
  markNotificationAsReadFailure,
} from '../slices/notificationsReadOne.slice';
import { fetchNotifications } from './fetchNotifications.thunk';
import { fetchUnreadNotificationsCount } from './fetchUnreadNotificationsCount.thunk';
import { ApiError } from '../../models/types/common';

export const readNotification = createAsyncThunk(
  'notifications/readOne',
  async (notificationId: string, { dispatch }) => {
    try {

      dispatch(markNotificationAsReadStart(notificationId));

      const response = await NotificationsReadOneService.markAsRead(notificationId);

      dispatch(markNotificationAsReadSuccess(response));

      await dispatch(fetchNotifications()).unwrap();

      await dispatch(fetchUnreadNotificationsCount()).unwrap();

      return response;
    } catch (error) {

      const apiError = error as ApiError;
      dispatch(markNotificationAsReadFailure({
        error: apiError.message || `Failed to mark notification ${notificationId} as read.`,
        notificationId: notificationId,
      }));

      throw error;
    }
  }
);
