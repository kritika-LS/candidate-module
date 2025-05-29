import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WithdrawApplicationState {
 loading: boolean;
 error: string | null;
 withdrawnJobId: string | null; // To track the last successfully withdrawn job ID
}

const initialState: WithdrawApplicationState = {
 loading: false,
 error: null,
 withdrawnJobId: null,
};

const withdrawApplicationSlice = createSlice({
 name: 'withdrawApplication',
 initialState,
 reducers: {
   withdrawApplicationStart: (state) => {
     state.loading = true;
     state.error = null;
     state.withdrawnJobId = null; // Clear previous success on new attempt
   },
   withdrawApplicationSuccess: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.withdrawnJobId = action.payload; // Store the ID of the job whose application was withdrawn
   },
   withdrawApplicationFailure: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.error = action.payload;
     state.withdrawnJobId = null; // Clear success on failure
   },
   clearWithdrawApplicationError: (state) => {
     state.error = null;
   },
   clearWithdrawnJobId: (state) => {
     state.withdrawnJobId = null;
   },
 },
});

export const {
 withdrawApplicationStart,
 withdrawApplicationSuccess,
 withdrawApplicationFailure,
 clearWithdrawApplicationError,
 clearWithdrawnJobId,
} = withdrawApplicationSlice.actions;

export default withdrawApplicationSlice.reducer;
