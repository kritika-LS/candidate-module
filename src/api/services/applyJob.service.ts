import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export class ApplyJobService {
 static async applyForJob(jobId: string): Promise<void> { // Assuming no specific response body on success
   const url = `${ENDPOINTS.DASHBOARD.applyJob}/${jobId}`;
   // For a PUT request with Content-Length: 0, we pass null or undefined as data
   return ApiClient.put<void>(url, null);
 }
}
