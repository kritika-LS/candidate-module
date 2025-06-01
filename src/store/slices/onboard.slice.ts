import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardState {
 data: any | null; // Adjust 'any' to a more specific type if you know the success payload structure
 loading: boolean;
 error: string | null;
 success: boolean; // To indicate successful onboarding
}

const initialState: OnboardState = {
 data: null,
 loading: false,
 error: null,
 success: false,
};

const onboardSlice = createSlice({
 name: 'onboard',
 initialState,
 reducers: {
   onboardStart: (state) => {
     state.loading = true;
     state.error = null;
     state.success = false; // Reset success state on new attempt
   },
   onboardSuccess: (state, action: PayloadAction<any>) => {
     state.loading = false;
     state.data = action.payload;
     state.success = true; // Set success to true
   },
   onboardFailure: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.error = action.payload;
     state.success = false; // Set success to false on failure
     state.data = null;
   },
   clearOnboardState: (state) => { // Utility to clear state after success/failure
     state.data = null;
     state.loading = false;
     state.error = null;
     state.success = false;
   },
 },
});

export const {
 onboardStart,
 onboardSuccess,
 onboardFailure,
 clearOnboardState,
} = onboardSlice.actions;

export default onboardSlice.reducer;
