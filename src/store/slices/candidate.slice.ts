import { createSlice } from '@reduxjs/toolkit'; // Adjust path as needed
import { fetchCandidate } from '../thunk/candidate.thunk';

// TODO: Replace with the real type
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
    clearCandidateError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload;
      })
      .addCase(fetchCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error occurred';
      });
  },
});

export const { clearCandidateError } = candidateSlice.actions;
export default candidateSlice.reducer;