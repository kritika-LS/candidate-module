import { createAsyncThunk } from '@reduxjs/toolkit';
import { UnreadNotificationsCountService } from '../../api/services/unreadNotificationsCount.service';
import {
  fetchUnreadCountStart,
  fetchUnreadCountSuccess,
  fetchUnreadCountFailure,
} from '../slices/unreadNotificationsCount.slice';
import { ApiError } from '../../models/types/common';

export const fetchUnreadNotificationsCount = createAsyncThunk(
  'unreadNotificationsCount/fetch',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchUnreadCountStart());

      const response = await UnreadNotificationsCountService.getCount();

      dispatch(fetchUnreadCountSuccess(response));

      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(fetchUnreadCountFailure(apiError.message || 'Failed to fetch unread notifications count.'));
      throw error;
    }
  }
);
