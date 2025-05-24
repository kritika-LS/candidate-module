import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 // *** REPLACE THIS with the actual type of your candidate work history data! ***
 type CandidateWorkHistory = any;

 interface CandidateWorkHistoryState {
  workHistory: CandidateWorkHistory | null;
  loading: boolean;
  error: string | null;
 }

 const initialState: CandidateWorkHistoryState = {
  workHistory: null,
  loading: false,
  error: null,
 };

 const candidateWorkHistorySlice = createSlice({
  name: 'candidateWorkHistory',
  initialState,
  reducers: {
    fetchCandidateWorkHistoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidateWorkHistorySuccess: (
      state,
      action: PayloadAction<CandidateWorkHistory>,
    ) => {
      state.loading = false;
      state.workHistory = action.payload;
    },
    fetchCandidateWorkHistoryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCandidateWorkHistoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCandidateWorkHistorySuccess: (
      state,
      action: PayloadAction<CandidateWorkHistory>,
    ) => {
      state.loading = false;
      state.workHistory = action.payload;
    },
    updateCandidateWorkHistoryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCandidateWorkHistoryError: (state) => {
      state.error = null;
    },
  },
 });

 export const {
  fetchCandidateWorkHistoryStart,
  fetchCandidateWorkHistorySuccess,
  fetchCandidateWorkHistoryFailure,
  updateCandidateWorkHistoryStart,
  updateCandidateWorkHistorySuccess,
  updateCandidateWorkHistoryFailure,
  clearCandidateWorkHistoryError,
 } = candidateWorkHistorySlice.actions;

 export default candidateWorkHistorySlice.reducer;