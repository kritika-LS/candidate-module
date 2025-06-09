import apiClient from '../apiClient'; // Assuming apiClient is configured for authentication
import { ENDPOINTS } from '../endPoints';
import { DoNotDisturbApiResponse, DoNotDisturbStatus } from '../../models/types/doNotDisturb'; // Import new types

export class DoNotDisturbService {
  /**
   * Updates the candidate's 'Do Not Disturb' status.
   * This endpoint uses a PUT request with a 'doNotDisturb' query parameter.
   * @param status The desired 'Do Not Disturb' status ('Y' for enabled, 'N' for disabled).
   * @returns A Promise that resolves to `DoNotDisturbApiResponse`.
   */
  static async updateStatus(
    status: DoNotDisturbStatus
  ): Promise<DoNotDisturbApiResponse> {
    const endpoint = `${ENDPOINTS.CANDIDATE.doNotDisturb}?doNotDisturb=${status}`;

    try {
      const response = await apiClient.put<DoNotDisturbApiResponse>(endpoint, undefined);

      return response;
    } catch (error) {
      console.error("Error in DoNotDisturbService.updateStatus:", error);
      throw error;
    }
  }
}
