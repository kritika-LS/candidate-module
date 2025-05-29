import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { JobDetails, JobDetailsApiResponse } from '../../models/types/jobDetails'; // Adjust path as needed

export class JobDetailsService {
 static async getJobDetails(jobId: string): Promise<JobDetails> { // This method still promises to return JobDetails
   const url = `${ENDPOINTS.DASHBOARD.jobDetails}/${jobId}/details`;

   // Make the API call, expecting the full JobDetailsApiResponse
   const response: JobDetailsApiResponse = await ApiClient.get<JobDetailsApiResponse>(url);

   // Now, extract the actual JobDetails from the responsePayload
   if (response.status === 'OK' && response.responsePayload && response.responsePayload.jobDetails) {
     return response.responsePayload.jobDetails; // This is of type JobDetails
   } else {
     // Handle cases where the API call is successful but the data is not as expected
     throw new Error(response.errorMessages || 'Failed to retrieve job details from payload.');
   }
 }
}
