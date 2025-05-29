import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export class WithdrawApplicationService {
 /**
  * Withdraws a job application for a specific job.
  * @param jobId The ID of the job for which to withdraw the application.
  * @returns A promise that resolves when the application is successfully withdrawn.
  */
 static async withdrawApplication(jobId: string): Promise<void> {
   const url = `${ENDPOINTS.MYJOBS.withdrawApplication}/${jobId}/withdraw-application`;
   return ApiClient.post<void>(url, null);
 }
}
