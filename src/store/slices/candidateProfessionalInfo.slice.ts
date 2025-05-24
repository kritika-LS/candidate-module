import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CandidateProfessionalInformation = any;

interface CandidateProfessionalInfoState {
  professionalInformation: CandidateProfessionalInformation | null;
  loading: boolean;
  error: string | null;
}

const initialState: CandidateProfessionalInfoState = {
  professionalInformation: null,
  loading: false,
  error: null,
};

const candidateProfessionalInfoSlice = createSlice({
  name: 'candidateProfessionalInfo',
  initialState,
  reducers: {
    fetchCandidateProfessionalInfoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidateProfessionalInfoSuccess: (
      state,
      action: PayloadAction<CandidateProfessionalInformation>,
    ) => {
      state.loading = false;
      state.professionalInformation = action.payload;
    },
    fetchCandidateProfessionalInfoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCandidateProfessionalInfoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCandidateProfessionalInfoSuccess: (
      state,
      action: PayloadAction<CandidateProfessionalInformation>,
    ) => {
      state.loading = false;
      state.professionalInformation = action.payload;
    },
    updateCandidateProfessionalInfoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCandidateProfessionalInfoError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCandidateProfessionalInfoStart,
  fetchCandidateProfessionalInfoSuccess,
  fetchCandidateProfessionalInfoFailure,
  updateCandidateProfessionalInfoStart,
  updateCandidateProfessionalInfoSuccess,
  updateCandidateProfessionalInfoFailure,
  clearCandidateProfessionalInfoError,
} = candidateProfessionalInfoSlice.actions;

export default candidateProfessionalInfoSlice.reducer;