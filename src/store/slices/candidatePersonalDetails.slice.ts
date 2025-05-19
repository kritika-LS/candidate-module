import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 type CandidatePersonalDetails = any;

 interface CandidatePersonalDetailsState {
  personalDetails: CandidatePersonalDetails | null;
  loading: boolean;
  error: string | null;
 }

 const initialState: CandidatePersonalDetailsState = {
  personalDetails: null,
  loading: false,
  error: null,
 };

 const candidatePersonalDetailsSlice = createSlice({
  name: 'candidatePersonalDetails',
  initialState,
  reducers: {
    fetchCandidatePersonalDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidatePersonalDetailsSuccess: (
      state,
      action: PayloadAction<CandidatePersonalDetails>,
    ) => {
      state.loading = false;
      state.personalDetails = action.payload;
    },
    fetchCandidatePersonalDetailsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCandidatePersonalDetailsError: (state) => {
      state.error = null;
    },
  },
 });

 export const {
  fetchCandidatePersonalDetailsStart,
  fetchCandidatePersonalDetailsSuccess,
  fetchCandidatePersonalDetailsFailure,
  clearCandidatePersonalDetailsError,
 } = candidatePersonalDetailsSlice.actions;

 export default candidatePersonalDetailsSlice.reducer;