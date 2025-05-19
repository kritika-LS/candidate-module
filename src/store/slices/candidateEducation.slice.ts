import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 // *** REPLACE THIS with the actual type of your candidate education data! ***
 type CandidateEducation = any;

 interface CandidateEducationState {
  educations: CandidateEducation | null;
  loading: boolean;
  error: string | null;
 }

 const initialState: CandidateEducationState = {
  educations: null,
  loading: false,
  error: null,
 };

 const candidateEducationSlice = createSlice({
  name: 'candidateEducation',
  initialState,
  reducers: {
    fetchCandidateEducationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidateEducationsSuccess: (
      state,
      action: PayloadAction<CandidateEducation>,
    ) => {
      state.loading = false;
      state.educations = action.payload;
    },
    fetchCandidateEducationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCandidateEducationsError: (state) => {
      state.error = null;
    },
  },
 });

 export const {
  fetchCandidateEducationsStart,
  fetchCandidateEducationsSuccess,
  fetchCandidateEducationsFailure,
  clearCandidateEducationsError,
 } = candidateEducationSlice.actions;

 export default candidateEducationSlice.reducer;