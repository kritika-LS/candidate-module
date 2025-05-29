import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export class UnsaveJobService {
 /**
  * Unsaves a job for the current candidate.
  * @param jobId The ID of the job to unsave.
  * @returns A promise that resolves when the job is successfully unsaved.
  */
 static async unsaveJob(jobId: string): Promise<void> {
   const url = `${ENDPOINTS.MYJOBS.unsaveJob}/${jobId}`;
   // As per your cURL, this is a PUT request with content-length: 0
   return ApiClient.put<void>(url, null); // Pass null for the body
 }
}
