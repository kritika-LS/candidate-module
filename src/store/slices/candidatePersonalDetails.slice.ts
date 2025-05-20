import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CandidatePersonalDetailsPayload } from '../../types/personalDetails';

 type CandidatePersonalDetails = any;

 interface CandidatePersonalDetailsState {
  personalDetails: CandidatePersonalDetails | null;
  loading: boolean;
  error: string | null;
  updateLoading: boolean;
  updateError: string | null;
 }

 const initialState: CandidatePersonalDetailsState = {
  personalDetails: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
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
    updatePersonalDetailsStart: (state) => {
      state.updateLoading = true;
      state.updateError = null;
    },
    updatePersonalDetailsSuccess: (
      state,
      action: PayloadAction<CandidatePersonalDetailsPayload>, // Assuming success returns the updated payload
    ) => {
      state.updateLoading = false;
      state.personalDetails = action.payload; // Update the stored details with the response
    },
    updatePersonalDetailsFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.updateError = action.payload;
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
  updatePersonalDetailsStart,
  updatePersonalDetailsSuccess,
  updatePersonalDetailsFailure,
  clearCandidatePersonalDetailsError,
 } = candidatePersonalDetailsSlice.actions;

 export default candidatePersonalDetailsSlice.reducer;