import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';

export class CandidateResumeService {
	static async uploadResume(resumeFile: FormData): Promise<any> {
		const url = ENDPOINTS.CANDIDATE.resume;
		return ApiClient.post<any>(url, resumeFile);
	}
}