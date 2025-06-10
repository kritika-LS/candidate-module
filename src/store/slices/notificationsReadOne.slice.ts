import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkNotificationAsReadApiResponse } from '../../models/types/notifications';

interface NotificationsReadOneState {
  loading: boolean;
  error: string | null;
  success: boolean;
  notificationId: string | null;
}

const initialState: NotificationsReadOneState = {
  loading: false,
  error: null,
  success: false,
  notificationId: null,
};

const notificationsReadOneSlice = createSlice({
  name: 'notificationsReadOne',
  initialState,
  reducers: {

    markNotificationAsReadStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.notificationId = action.payload;
    },

    markNotificationAsReadSuccess: (state, action: PayloadAction<MarkNotificationAsReadApiResponse>) => {
      state.loading = false;
      state.success = true;
    },

    markNotificationAsReadFailure: (state, action: PayloadAction<{ error: string; notificationId: string }>) => {
      state.loading = false;
      state.error = action.payload.error;
      state.success = false;
      state.notificationId = action.payload.notificationId;
    },

    clearMarkNotificationAsReadState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.notificationId = null;
    },
  },
});

export const {
  markNotificationAsReadStart,
  markNotificationAsReadSuccess,
  markNotificationAsReadFailure,
  clearMarkNotificationAsReadState,
} = notificationsReadOneSlice.actions;

export default notificationsReadOneSlice.reducer;
