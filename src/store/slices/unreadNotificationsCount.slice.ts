import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UnreadNotificationsCountApiResponse } from '../../models/types/notifications'; // Import the API response type

interface UnreadNotificationsCountState {
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: UnreadNotificationsCountState = {
  count: 0,
  loading: false,
  error: null,
};

const unreadNotificationsCountSlice = createSlice({
  name: 'unreadNotificationsCount',
  initialState,
  reducers: {
    fetchUnreadCountStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchUnreadCountSuccess: (
      state,
      action: PayloadAction<UnreadNotificationsCountApiResponse>
    ) => {
      state.loading = false;
      state.count = action.payload.responsePayload;
    },

    fetchUnreadCountFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.count = 0;
    },

    clearUnreadCountError: (state) => {
      state.error = null;
    },

    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    }
  },
});

export const {
  fetchUnreadCountStart,
  fetchUnreadCountSuccess,
  fetchUnreadCountFailure,
  clearUnreadCountError,
  setUnreadCount,
} = unreadNotificationsCountSlice.actions;

export default unreadNotificationsCountSlice.reducer;
