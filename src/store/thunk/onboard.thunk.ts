import { createAsyncThunk } from '@reduxjs/toolkit';
import { OnboardService, OnboardApiResponse } from '../../api/services/onboard.service'; // Import new service and its response type
import { onboardStart, onboardSuccess, onboardFailure } from '../slices/onboard.slice'; // Import new slice actions
import { ApiError } from '../../models/types/common'; // Assuming ApiError type is defined here
import { OnboardingDetails } from '../../models/types/onboarding'; // Import OnboardingDetails type

// Define the payload for the thunk
interface OnboardCandidatePayload {
 onboardingDetails: OnboardingDetails;
 resumeFile: File; // Expects a File object
}

export const onboardCandidate = createAsyncThunk(
 'onboard/onboardCandidate',
 async (payload: OnboardCandidatePayload, { dispatch }) => {
   try {
     dispatch(onboardStart());
     const response: OnboardApiResponse = await OnboardService.onboardCandidate(
       payload.onboardingDetails,
       payload.resumeFile,
     );
     dispatch(onboardSuccess(response.responsePayload)); // Assuming responsePayload is what you want to store on success
     return response;
   } catch (error) {
     const apiError = error as ApiError;
     dispatch(onboardFailure(apiError.message || 'Failed to onboard candidate'));
     throw error;
   }
 },
);
