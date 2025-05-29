import apiClient from "../apiClient";
import { ENDPOINTS } from "../endPoints";
import { Job } from '../../models/types/Dashboard'; // Assuming your existing Job type is compatible
import { CandidatePoolJobsApiResponse } from '../../models/types/candidatePoolJobs'; // Import the new API response interface

export class CandidatePoolJobsService {
 /**
  * Fetches jobs from the candidate pool with optional status filters.
  * @param page The page number (0-indexed).
  * @param pageSize The number of results per page.
  * @param candidateProcessStatus Optional: Filter by candidate's process status (e.g., 'S' for Saved, 'A' for Applied).
  * @param enterpriseProcessStatus Optional: Filter by enterprise's process status (e.g., 'O' for Open).
  * @returns A promise that resolves to an array of Job objects.
  */
 static async getCandidatePoolJobs(
   page: number,
   pageSize: number,
   candidateProcessStatus?: 'S' | 'A',
   enterpriseProcessStatus?: 'O' | 'AS'
 ): Promise<Job[]> { // This method still promises to return Job[]
   let endpoint = `${ENDPOINTS.MYJOBS.candidatePoolJobs}/${page}/${pageSize}`;

   const queryParams = new URLSearchParams();

   // Conditionally add candidateProcessStatus
   if (candidateProcessStatus) {
     queryParams.append('candidateProcessStatus', candidateProcessStatus);
   }

   // Conditionally add enterpriseProcessStatus
   if (enterpriseProcessStatus) {
     queryParams.append('enterpriseProcessStatus', enterpriseProcessStatus);
   }

   // Append query parameters to the endpoint if any exist
   if (queryParams.toString()) {
     endpoint += `?${queryParams.toString()}`;
   }

   // Make the API call, expecting the full CandidatePoolJobsApiResponse
   const response: CandidatePoolJobsApiResponse = await apiClient.get<CandidatePoolJobsApiResponse>(endpoint);

   // Check status and extract the responsePayload
   if (response.status === 'OK' && Array.isArray(response.responsePayload)) {
     return response.responsePayload; // This is the Job[] array
   } else {
     // Handle cases where the API call is successful but the data is not as expected
     throw new Error(response.errorMessages || 'Failed to retrieve jobs from candidate pool.');
   }
 }
}
