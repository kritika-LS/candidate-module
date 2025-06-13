import * as Yup from 'yup';

export const referencesSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    workedWithFacilityName: Yup.string().required('Worked with/facility name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    mobileNumber: Yup.string()
      .required('Mobile number is required')
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number'), // Added validation for mobileNumber
  })