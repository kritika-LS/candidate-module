import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { JobsMatchingApiResponse, JobSearchRequestBody } from '../../models/types/jobSearch'; // Adjust path
import { Job } from '../../models/types/Dashboard'; // Ensure this is correctly imported if Job type is used in JobSearchRequestBody

export class JobsMatchingService {
 /**
  * Fetches jobs matching a given search criteria.
  * @param page The page number (0-indexed).
  * @param pageSize The number of results per page.
  * @param requestBody The detailed search criteria.
  * @returns A promise that resolves to the full JobsMatchingApiResponse object.
  */
 static async getMatchingJobs(
   page: number,
   pageSize: number,
   requestBody: JobSearchRequestBody,
 ): Promise<JobsMatchingApiResponse> { // Changed return type to JobsMatchingApiResponse
   // Assuming ENDPOINTS.SEARCH_TAB.matchingJobs is correctly defined, e.g., '/api/v1/candidate/jobs/matching'
   const url = `${ENDPOINTS.SEARCH_TAB.matchingJobs}/${page}/${pageSize}`; // Using DASHBOARD as per previous context

   const response: JobsMatchingApiResponse = await ApiClient.post<JobsMatchingApiResponse>(url, requestBody);

   if (response.status === 'OK') {
     // Return the entire response object as per the new Promise type
     return response;
   } else {
     throw new Error(response.errorMessages || 'Failed to fetch matching jobs.');
   }
 }
}
