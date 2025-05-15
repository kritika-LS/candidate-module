export interface PendingAction {
	id: string;
	text: string;
}

export interface Job {
	id: string;
	title: string;
	type: string;
	companyName: string;
	location: string;
	reference: string;
	rate: string;
	experience: string;
	shift: string;
	openings: number;
	startDate: string;
	endDate: string;
	duration: string;
	postedAgo: string;
}

export type JobList = Job[];