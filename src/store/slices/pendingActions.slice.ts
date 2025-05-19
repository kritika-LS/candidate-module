import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 // *** REPLACE THIS with the actual type of your pending action data! ***
 type PendingAction = any;

 interface PendingActionsState {
  actions: PendingAction[];
  loading: boolean;
  error: string | null;
 }

 const initialState: PendingActionsState = {
  actions: [],
  loading: false,
  error: null,
 };

 const pendingActionsSlice = createSlice({
  name: 'pendingActions',
  initialState,
  reducers: {
    fetchPendingActionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPendingActionsSuccess: (state, action: PayloadAction<PendingAction[]>) => {
      state.loading = false;
      state.actions = action.payload;
    },
    fetchPendingActionsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPendingActionsError: (state) => {
      state.error = null;
    },
  },
 });

 export const {
  fetchPendingActionsStart,
  fetchPendingActionsSuccess,
  fetchPendingActionsFailure,
  clearPendingActionsError,
 } = pendingActionsSlice.actions;

 export default pendingActionsSlice.reducer;