import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UnsaveJobState {
 loading: boolean;
 error: string | null;
 unsavedJobId: string | null; // To track the last successfully unsaved job ID
}

const initialState: UnsaveJobState = {
 loading: false,
 error: null,
 unsavedJobId: null,
};

const unsaveJobSlice = createSlice({
 name: 'unsaveJob',
 initialState,
 reducers: {
   unsaveJobStart: (state) => {
     state.loading = true;
     state.error = null;
     state.unsavedJobId = null;
   },
   unsaveJobSuccess: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.unsavedJobId = action.payload; // Store the ID of the job that was unsaved
   },
   unsaveJobFailure: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.error = action.payload;
     state.unsavedJobId = null;
   },
   clearUnsaveJobError: (state) => {
     state.error = null;
   },
   clearUnsavedJobId: (state) => {
     state.unsavedJobId = null;
   },
 },
});

export const {
 unsaveJobStart,
 unsaveJobSuccess,
 unsaveJobFailure,
 clearUnsaveJobError,
 clearUnsavedJobId,
} = unsaveJobSlice.actions;

export default unsaveJobSlice.reducer;
