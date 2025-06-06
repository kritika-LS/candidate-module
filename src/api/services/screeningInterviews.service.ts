 import { CandidateInterviewScreeningApiResponse } from '../../models/types/screeningInterview';
import apiClient from '../apiClient'; // Assuming apiClient is configured for authentication
 import { ENDPOINTS } from '../endPoints';

 /**
  * Service class for interacting with candidate interview screening related APIs.
  */
 export class CandidateInterviewScreeningService { // Class name remains as it interacts with CandidateInterview API
  /**
   * Fetches candidate interview screening data from the API.
   * The endpoint expects `pageFrom` and `pageSize` as path parameters.
   * @param pageFrom The starting page index (0-indexed).
   * @param pageSize The number of records to return per page.
   * @returns A Promise that resolves to `CandidateInterviewScreeningApiResponse`.
   */
  static async getScreening(
    pageFrom: number,
    pageSize: number
  ): Promise<CandidateInterviewScreeningApiResponse> {
    // Construct the full URL using the endpoint and path parameters
    const endpoint = `${ENDPOINTS.CANDIDATE.getScreening}/${pageFrom}/${pageSize}`;

    try {
      // Make the GET request using the configured apiClient
      const response = await apiClient.get<CandidateInterviewScreeningApiResponse>(endpoint);

      // Axios wraps the actual API response in the `data` property
      if (response?.status === 'OK') {
        return response; // Return the actual API response payload
      } else {
        // Log the full error response from the API for debugging purposes
        console.error("API Error during getScreening:", response);
        // Throw an error with the message from the API or a default one
        throw new Error(response?.errorMessages || 'Failed to fetch interview screening data.');
      }
    } catch (error) {
      // Log and re-throw any network or unexpected errors
      console.error("Error in CandidateInterviewScreeningService.getScreening:", error);
      throw error;
    }
  }
 }
