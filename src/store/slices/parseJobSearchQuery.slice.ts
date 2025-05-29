import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParseJobSearchQueryResponse } from '../../api/services/parseJobSearchQuery.service'; // Import the full response type

// Define the type for the data you'll actually store in the slice
// This should match the 'responsePayload' part of your API response
type ParsedQueryData = ParseJobSearchQueryResponse['responsePayload'];

interface ParseJobSearchQueryState {
 data: ParsedQueryData; // Stores the parsed data (e.g., { jobTitle: "RN", location: "NYC" })
 loading: boolean;
 error: string | null;
}

const initialState: ParseJobSearchQueryState = {
 data: null, // Initialize as null or an empty object {} depending on expected empty state
 loading: false,
 error: null,
};

const parseJobSearchQuerySlice = createSlice({
 name: 'parseJobSearchQuery',
 initialState,
 reducers: {
   parseJobSearchQueryStart: (state) => {
     state.loading = true;
     state.error = null;
     state.data = null; // Clear previous data on new request
   },
   parseJobSearchQuerySuccess: (state, action: PayloadAction<ParsedQueryData>) => {
     state.loading = false;
     state.data = action.payload;
   },
   parseJobSearchQueryFailure: (state, action: PayloadAction<string>) => {
     state.loading = false;
     state.error = action.payload;
     state.data = null;
   },
   clearParseJobSearchQueryError: (state) => {
     state.error = null;
   },
   clearParsedJobSearchQueryData: (state) => {
     state.data = null;
   }
 },
});

export const {
 parseJobSearchQueryStart,
 parseJobSearchQuerySuccess,
 parseJobSearchQueryFailure,
 clearParseJobSearchQueryError,
 clearParsedJobSearchQueryData,
} = parseJobSearchQuerySlice.actions;

export default parseJobSearchQuerySlice.reducer;
