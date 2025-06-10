import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkAllNotificationsAsReadApiResponse } from '../../models/types/notifications';

interface NotificationsReadAllState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: NotificationsReadAllState = {
  loading: false,
  error: null,
  success: false,
};

const notificationsReadAllSlice = createSlice({
  name: 'notificationsReadAll',
  initialState,
  reducers: {

    markAllAsReadStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },

    markAllAsReadSuccess: (state, action: PayloadAction<MarkAllNotificationsAsReadApiResponse>) => {
      state.loading = false;
      state.success = true;
    },

    markAllAsReadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    clearMarkAllAsReadState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  markAllAsReadStart,
  markAllAsReadSuccess,
  markAllAsReadFailure,
  clearMarkAllAsReadState,
} = notificationsReadAllSlice.actions;

export default notificationsReadAllSlice.reducer;
