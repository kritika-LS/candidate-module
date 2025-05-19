export interface PendingAction {
	id: string;
	text: string;
}

export interface Job {
	jobId: string;
	jobTitle: string;
	jobType: string;
	facilityName: string;
	city: string;
	state: string;
	country: string;
	jobReferenceNumber: string;
	payRateMinimum: string;
	payRateMaximum: string;
	overallYearsOfExperienceMinimum: string;
	overallYearsOfExperienceMaximum: string;
	jobExperienceLevel: string;
	shiftDetails: string;
	numberOfOpenings: number;
	validFrom: string;
	validTill: string;
	duration: string;
	postedOn: string;
}

export type JobList = Job[];