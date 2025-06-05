import apiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import { SkillChecklistApiResponse, SkillChecklistRequestBody } from '../../models/types/skillChecklist'; // Import the new types
import { SaveSkillChecklistResponseApiResponse, SaveSkillChecklistResponseRequestBody } from '../../models/types/saveSkillChecklist';

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

 static async saveResponses(
  requestBody: any
): Promise<any> {
  const endpoint = ENDPOINTS.SKILL_CHECKLIST.saveResponses;

  try {
    const response = await apiClient.put<SaveSkillChecklistResponseApiResponse>(endpoint, requestBody);

    if (response?.status === 'OK') {
      return response; // Axios wraps the actual response in .data
    } else {
      // Log the full error response for debugging
      console.error("API Error during saveResponses:", response);
      throw new Error(response?.errorMessages || 'Failed to save skill checklist responses.');
    }
  } catch (error) {
    // Re-throw the error after logging or handling
    console.error("Error in SaveSkillChecklistResponseService.saveResponses:", error);
    throw error;
  }
}

}

