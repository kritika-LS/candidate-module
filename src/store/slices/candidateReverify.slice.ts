import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReverifyApiResponse } from '../../models/types/candidateReverify';

interface CandidateReverifyState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CandidateReverifyState = {
  loading: false,
  error: null,
  success: false,
};

const candidateReverifySlice = createSlice({
  name: 'candidateReverify', // Unique name for the slice
  initialState,
  reducers: {

    reverifyStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },

    reverifySuccess: (
      state,
      action: PayloadAction<ReverifyApiResponse>
    ) => {
      state.loading = false;
      state.success = true;
    },

    reverifyFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    clearReverifyState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  reverifyStart,
  reverifySuccess,
  reverifyFailure,
  clearReverifyState,
} = candidateReverifySlice.actions;

export default candidateReverifySlice.reducer;
