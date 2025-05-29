import apiClient from "../apiClient";
import { ENDPOINTS } from "../endPoints";
import { Job } from "../../models/types/Dashboard"; // Assuming Job type is defined here
import { JobSearchRequestBody } from '../../models/types/jobSearch'; // Import JobSearchRequestBody

// Define the expected API response structure for recommended jobs with filters
export interface RecommendedJobsWithFiltersApiResponse {
 status: string;
 errorId: string | null;
 successMessage: string | null;
 errorMessages: string | null;
 totalResults: number;
 responsePayload: Job[];
}

export class RecommendedJobsWithFiltersService {
 /**
  * Fetches recommended jobs with optional filtering criteria via a POST request body.
  * @param page The page number (0-indexed).
  * @param pageSize The number of results per page.
  * @param requestBody Optional filtering criteria.
  * @returns A promise that resolves to the full API response containing jobs and total results.
  */
 static async getRecommendedJobs(
   page: number,
   pageSize: number,
   requestBody?: Partial<JobSearchRequestBody> // Use Partial as not all fields might be sent
 ): Promise<RecommendedJobsWithFiltersApiResponse> {
   const endpoint = `${ENDPOINTS.DASHBOARD.recommendedJobs}/${page}/${pageSize}`;

   // Send the provided requestBody with the POST request.
   // If no requestBody is provided, send an empty object as the body as per cURL.
   const payload = requestBody || {};

   const response = await apiClient.post<RecommendedJobsWithFiltersApiResponse>(endpoint, payload);

   if (response.status === 'OK') {
     return response; // Return the entire response object
   } else {
     throw new Error(response.errorMessages || 'Failed to fetch recommended jobs with filters');
   }
 }
}
