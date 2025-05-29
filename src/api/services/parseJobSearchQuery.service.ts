import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';


interface ParseJobSearchQueryRequest {
 data: string;
}

export interface ParseJobSearchQueryResponse {
 status: string;
 errorId: string | null;
 successMessage: string | null;
 errorMessages: string | null;
 totalResults: number | null;
 responsePayload: {
   jobTitle?: string;
   location?: string;
   skills?: string[];
   [key: string]: any; // Fallback for unknown properties
 } | null;
}

export class ParseJobSearchQueryService {
 /**
  * Parses a job search query string into structured data.
  * @param query The raw search query string (e.g., "registered nurse in NYC").
  * @returns A promise that resolves to the parsed data.
  */
 static async parseQuery(query: string): Promise<ParseJobSearchQueryResponse> {
   const url = ENDPOINTS.SEARCH_TAB.parseJobSearchQuery;
   const payload: ParseJobSearchQueryRequest = { data: query };
   return ApiClient.post<ParseJobSearchQueryResponse>(url, payload);
 }
}
