import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationsReadAllService } from '../../api/services/notificationsReadAll.service';
import {
  markAllAsReadStart,
  markAllAsReadSuccess,
  markAllAsReadFailure,
} from '../slices/notificationsReadAll.slice';
import { fetchNotifications } from './fetchNotifications.thunk';
import { ApiError } from '../../models/types/common';

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { dispatch }) => {
    try {
      dispatch(markAllAsReadStart());

      const response = await NotificationsReadAllService.markAllAsRead();

      dispatch(markAllAsReadSuccess(response));

      await dispatch(fetchNotifications()).unwrap();

      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(markAllAsReadFailure(apiError.message || 'Failed to mark all notifications as read.'));
      throw error;
    }
  }
);
