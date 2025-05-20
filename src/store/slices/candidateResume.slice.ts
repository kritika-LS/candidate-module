import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the resume upload response.
// This should match what your API returns after a successful upload.
type ResumeUploadResponse = {
	message: string;
	// Add other fields you expect, e.g., fileUrl: string, fileId: string
};

interface CandidateResumeState {
	resume: ResumeUploadResponse | null;
	loading: boolean;
	error: string | null;
}

const initialState: CandidateResumeState = {
	resume: null,
	loading: false,
	error: null,
};

const candidateResumeSlice = createSlice({
	name: 'candidateResume',
	initialState,
	reducers: {
		uploadResumeStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		uploadResumeSuccess: (
			state,
			action: PayloadAction<ResumeUploadResponse>,
		) => {
			state.loading = false;
			state.resume = action.payload;
		},
		uploadResumeFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearResumeError: (state) => {
			state.error = null;
		},
	},
});

export const {
	uploadResumeStart,
	uploadResumeSuccess,
	uploadResumeFailure,
	clearResumeError,
} = candidateResumeSlice.actions;

export default candidateResumeSlice.reducer;