import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CandidateReference = any;

interface CandidateReferencesState {
  references: CandidateReference | null;
  loading: boolean;
  error: string | null;
}

const initialState: CandidateReferencesState = {
  references: null,
  loading: false,
  error: null,
};

const candidateReferencesSlice = createSlice({
  name: 'candidateReferences',
  initialState,
  reducers: {
    fetchCandidateReferencesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidateReferencesSuccess: (
      state,
      action: PayloadAction<CandidateReference>,
    ) => {
      state.loading = false;
      state.references = action.payload;
    },
    fetchCandidateReferencesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCandidateReferencesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCandidateReferencesSuccess: (
      state,
      action: PayloadAction<CandidateReference>,
    ) => {
      state.loading = false;
      state.references = action.payload;
    },
    updateCandidateReferencesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCandidateReferencesError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCandidateReferencesStart,
  fetchCandidateReferencesSuccess,
  fetchCandidateReferencesFailure,
  updateCandidateReferencesStart,
  updateCandidateReferencesSuccess,
  updateCandidateReferencesFailure,
  clearCandidateReferencesError,
} = candidateReferencesSlice.actions;

export default candidateReferencesSlice.reducer;