import apiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { OnboardingDetails } from '../../models/types/onboarding'; // Import the new type

// Define the expected API response structure for onboarding
export interface OnboardApiResponse {
 status: string;
 errorId: string | null;
 successMessage: string | null;
 errorMessages: string | null;
 responsePayload: any; // Adjust based on actual successful response payload
}

export class OnboardService {
 /**
  * Submits candidate onboarding details and a resume file.
  * @param onboardingDetails The structured JSON data for onboarding.
  * @param resumeFile The File object for the resume (e.g., PDF).
  * @returns A promise that resolves to the API response.
  */
 static async onboardCandidate(
   onboardingDetails: OnboardingDetails,
   resumeFile: File // Expects a File object
 ): Promise<OnboardApiResponse> {
   const endpoint = ENDPOINTS.CANDIDATE_ONBOARDING.onboard;

   const formData = new FormData();

   // Append onboardingDetails as a JSON string with a specific filename and content type
   formData.append('onboardingDetails', new Blob([JSON.stringify(onboardingDetails)], { type: 'application/json' }), 'onboardingDetails.json');

   // Append the resume file
   formData.append('resume', resumeFile, resumeFile.name); // Use resumeFile.name for the filename

   // apiClient.post should be configured to handle FormData directly,
   // without manually setting 'Content-Type' header as it will be set by FormData.
   const response = await apiClient.post<OnboardApiResponse>(endpoint, formData);

   if (response.status === 'OK') {
     return response;
   } else {
     throw new Error(response.errorMessages || 'Failed to onboard candidate.');
   }
 }
}
