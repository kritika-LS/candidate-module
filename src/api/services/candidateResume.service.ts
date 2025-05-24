import ApiClient from '../apiClient';
import { ENDPOINTS } from '../endPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class CandidateResumeService {
	static async uploadResume(resumeFile: FormData): Promise<any> {
		const url = ENDPOINTS.CANDIDATE.resume;
		
		// Get the latest token
		const token = await AsyncStorage.getItem('auth_token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		return ApiClient.post<any>(url, resumeFile, {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Accept-Language': 'en-US,en;q=0.9',
				'Authorization': `Bearer ${token}`,
				'Origin': 'https://dev-onboarding.thehummingbird.solutions',
				'Referer': 'https://dev-onboarding.thehummingbird.solutions/',
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
			},
		});
	}
}