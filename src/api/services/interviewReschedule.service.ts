import { RescheduleInterviewApiResponse, RescheduleInterviewRequestBody } from '../../models/types/interviewReschedule';
import apiClient from '../apiClient'; // Assuming apiClient is configured for authentication
import { ENDPOINTS } from '../endPoints';

export class InterviewRescheduleService {
  /**
   * Sends a request to reschedule a candidate interview.
   * This endpoint uses a POST request with a JSON body.
   * @param requestBody The data required for rescheduling, including preferred date, consent, and candidate pool ID.
   * @returns A Promise that resolves to `RescheduleInterviewApiResponse`.
   */
  static async reschedule(
    requestBody: RescheduleInterviewRequestBody
  ): Promise<RescheduleInterviewApiResponse> {
    const endpoint = ENDPOINTS.CANDIDATE.reSchedule;

    try {
      const response = await apiClient.post<RescheduleInterviewApiResponse>(endpoint, requestBody);

      return response;
    } catch (error) {
      // Log and re-throw any network or unexpected errors
      console.error("Error in InterviewRescheduleService.reschedule:", error);
      throw error;
    }
  }
}
