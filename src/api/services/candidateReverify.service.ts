import apiClient from '../apiClient'; // Assuming apiClient is configured for authentication
 import { ENDPOINTS } from '../endPoints';
 import { ReverifyRequestBody, ReverifyApiResponse } from '../../models/types/candidateReverify'; // Import new types

 export class CandidateReverifyService {
  /**
   * Sends a request to reverify the candidate's account, with a password.
   * @param requestBody The data required for reverification (e.g., password).
   * @returns A Promise that resolves to `ReverifyApiResponse`.
   */
  static async reverify(
    requestBody: ReverifyRequestBody
  ): Promise<ReverifyApiResponse> {
    const endpoint = ENDPOINTS.CANDIDATE.reverify;

    try {
      const response = await apiClient.post<ReverifyApiResponse>(endpoint, requestBody);

      return response;
    } catch (error) {
      console.error("Error in CandidateReverifyService.reverify:", error);
      throw error;
    }
  }
 }
