import apiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { SkillChecklistApiResponse, SkillChecklistRequestBody } from '../../models/types/skillChecklist'; // Import the new types

export class SkillChecklistService {
 /**
  * Fetches skill checklist responses based on the provided criteria.
  * This endpoint uses a POST request with a JSON body for filtering.
  * @param requestBody The filtering criteria for skill checklists.
  * @returns A promise that resolves to the API response containing skill checklist items.
  */
 static async getResponses(
   requestBody: SkillChecklistRequestBody
 ): Promise<SkillChecklistApiResponse> {
   const endpoint = ENDPOINTS.SKILL_CHECKLIST.getResponses;

   const response = await apiClient.post<SkillChecklistApiResponse>(endpoint, requestBody);

   if (response.status === 'OK') {
     return response;
   } else {
     throw new Error(response.errorMessages || 'Failed to fetch skill checklist responses.');
   }
 }
}
