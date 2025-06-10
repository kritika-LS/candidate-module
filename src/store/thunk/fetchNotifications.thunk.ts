import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationsService } from '../../api/services/notifications.service';
import { FetchNotificationsRequest } from '../../models/types/notifications';
import {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} from '../slices/notifications.slice';
import { ApiError } from '../../models/types/common';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetch', // Unique action type prefix
  async (payload: FetchNotificationsRequest | void, { dispatch }) => {
    try {

      dispatch(fetchNotificationsStart());

      const response = await NotificationsService.getNotifications();

      dispatch(fetchNotificationsSuccess({
        items: response.responsePayload,
        totalResults: response.totalResults,
      }));

      return response;
    } catch (error) {

      const apiError = error as ApiError;
      dispatch(fetchNotificationsFailure(apiError.message || 'Failed to fetch notifications.'));
      throw error;
    }
  }
);
