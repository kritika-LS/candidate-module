import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CandidateSearchCriteriaResponse } from '../../api/services/candidateSearchCriteria.service'; // Adjust path

interface CandidateSearchCriteriaState {
  data: CandidateSearchCriteriaResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: CandidateSearchCriteriaState = {
  data: null,
  loading: false,
  error: null,
};

const candidateSearchCriteriaSlice = createSlice({
  name: 'candidateSearchCriteria',
  initialState,
  reducers: {
    fetchCandidateSearchCriteriaStart: (state) => {
      state.loading = true;
      state.error = null;
      state.data = null; // Clear previous data on new fetch
    },
    fetchCandidateSearchCriteriaSuccess: (
      state,
      action: PayloadAction<CandidateSearchCriteriaResponse>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCandidateSearchCriteriaFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
    clearCandidateSearchCriteriaError: (state) => {
      state.error = null;
    },
    clearCandidateSearchCriteria: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },
});

export const {
  fetchCandidateSearchCriteriaStart,
  fetchCandidateSearchCriteriaSuccess,
  fetchCandidateSearchCriteriaFailure,
  clearCandidateSearchCriteriaError,
  clearCandidateSearchCriteria,
} = candidateSearchCriteriaSlice.actions;

export default candidateSearchCriteriaSlice.reducer;