import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SaveJobState {
  loading: boolean;
  error: string | null;
  savedJobId: string | null; // To keep track of the last successfully saved job ID
}

const initialState: SaveJobState = {
  loading: false,
  error: null,
  savedJobId: null,
};

const saveJobSlice = createSlice({
  name: 'saveJob',
  initialState,
  reducers: {
    saveJobStart: (state) => {
      state.loading = true;
      state.error = null;
      state.savedJobId = null; // Clear previous success on new attempt
    },
    saveJobSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.savedJobId = action.payload; // Store the ID of the job that was saved
    },
    saveJobFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.savedJobId = null; // Clear success on failure
    },
    clearSaveJobError: (state) => {
      state.error = null;
    },
    clearSavedJobId: (state) => {
      state.savedJobId = null; // Utility to clear the saved ID if needed
    },
  },
});

export const {
  saveJobStart,
  saveJobSuccess,
  saveJobFailure,
  clearSaveJobError,
  clearSavedJobId,
} = saveJobSlice.actions;

export default saveJobSlice.reducer;