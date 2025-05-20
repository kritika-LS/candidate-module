export interface CandidateAddress {
    addressType: string;
    address: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
    addressNotes: string;
    addressId?: string;
}

export interface CandidateResume {
    resumeId: string;
    professionalTitle: string;
    specialties: string;
    overallYearsOfExperience: number;
    resumePhysicalPath: string;
    resumeSignedUrl: string;
    parsedData: string;
}

export interface EmergencyContactDetail {
    firstName: string;
    lastName: string;
    relationship: string;
    primaryMobileNumberCountryCode: string;
    primaryMobileNumber: string;
    secondaryMobileNumberCountryCode: string;
    secondaryMobileNumber: string;
    workPhoneNumberCountryCode: string;
    workPhoneNumber: string;
    address: CandidateAddress[];
}

export interface CandidatePersonalDetailsPayload {
    candidateId: string;
    emailAddress: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    mediaFile: string | null;
    mediaFilePresignedUrl: string | null;
    profileTitle: string;
    brief: string | null;
    overallYearsOfExperience: number;
    alternateEmailAddress: string;
    mobileNumber: string;
    alternatePhoneNumber: string;
    knownAs: string | null;
    otherPreviouslyUsedName: string | null;
    gender: string | null;
    nationality: string | null;
    ethnicity: string | null;
    militaryStatus: string | null;
    workplacePreference: string | null;
    address: CandidateAddress[];
    resumes: CandidateResume[];
    portfolioUrl1: string | null;
    portfolioUrl2: string | null;
    portfolioUrl3: string | null;
    portfolioUrl4: string | null;
    workTypePreference: string;
    preferredShift: string;
    availableFrom: string;
    preferredLocation: string;
    currency: string;
    wageExpectationCategory: string | null;
    shiftTimezone: string | null;
    dateOfBirth: string;
    ssn: string;
    emergencyContactDetails: EmergencyContactDetail[];
    profileCompletionPercentage: number;
    mobileNumberCountryCode: string;
    alternatePhoneNumberCountryCode: string;
}