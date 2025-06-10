import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationItem } from '../../models/types/notifications';

interface NotificationsState {
  items: NotificationItem[];
  loading: boolean;
  error: string | null;
  totalResults: number;
}

const initialState: NotificationsState = {
  items: [],
  loading: false,
  error: null,
  totalResults: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications', // Unique name for the slice
  initialState,
  reducers: {

    fetchNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchNotificationsSuccess: (
      state,
      action: PayloadAction<{ items: NotificationItem[]; totalResults: number }>
    ) => {
      state.loading = false;
      state.items = action.payload.items;
      state.totalResults = action.payload.totalResults;
    },

    fetchNotificationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.items = []; // Clear data on error
      state.totalResults = 0;
    },
    /**
     * Action to clear only the error message for notifications.
     */
    clearNotificationsError: (state) => {
      state.error = null;
    },
    /**
     * Action to clear all notification data and reset total results.
     */
    clearNotificationsData: (state) => {
      state.items = [];
      state.totalResults = 0;
    },
    // You might add actions for marking notifications as read, deleting, etc. here
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(item => item.notificationId === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
  },
});

export const {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  clearNotificationsError,
  clearNotificationsData,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
