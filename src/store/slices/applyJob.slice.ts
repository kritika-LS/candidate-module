import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApplyJobState {
 loading: boolean;
 error: string | null;
 appliedJobId: string | null; // To keep track of the last successfully applied job ID
}

const initialState: ApplyJobState = {
 loading: false,
 error: null,
 appliedJobId: null,
};

const applyJobSlice = createSlice({
 name: 'applyJob',
 initialState,
 reducers: {
   applyJobStart: (state) => {
     state.loading = true;
     state.error = null;
     state.appliedJobId = null; // Clear previous success on new attempt
   },
   applyJobSuccess: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.appliedJobId = action.payload; // Store the ID of the job that was applied for
   },
   applyJobFailure: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.error = action.payload;
     state.appliedJobId = null; // Clear success on failure
   },
   clearApplyJobError: (state) => {
     state.error = null;
   },
   clearAppliedJobId: (state) => {
     state.appliedJobId = null; // Utility to clear the applied ID if needed
   },
 },
});

export const {
 applyJobStart,
 applyJobSuccess,
 applyJobFailure,
 clearApplyJobError,
 clearAppliedJobId,
} = applyJobSlice.actions;

export default applyJobSlice.reducer;
