import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export class SaveJobService {
  static async saveJob(jobId: string): Promise<void> { // Assuming no specific response body on success
    const url = `${ENDPOINTS.DASHBOARD.saveJob}/${jobId}`;
    return ApiClient.put<void>(url, null);
  }
}