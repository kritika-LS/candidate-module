import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 // *** REPLACE THIS with the actual type of your candidate data! ***
 type Candidate = any;

 interface CandidateState {
  candidate: Candidate | null;
  loading: boolean;
  error: string | null;
 }

 const initialState: CandidateState = {
  candidate: null,
  loading: false,
  error: null,
 };

 const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    fetchCandidateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidateSuccess: (state, action: PayloadAction<Candidate>) => {
      state.loading = false;
      state.candidate = action.payload;
    },
    fetchCandidateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCandidateError: (state) => {
      state.error = null;
    },
  },
 });

 export const {
  fetchCandidateStart,
  fetchCandidateSuccess,
  fetchCandidateFailure,
  clearCandidateError,
 } = candidateSlice.actions;

 export default candidateSlice.reducer;