import * as yup from 'yup';

export const personalDetailsSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .max(128, 'First name cannot exceed 128 characters'),

  lastName: yup
    .string()
    .required('Last name is required')
    .max(128, 'Last name cannot exceed 128 characters'),

  alternateEmail: yup
    .string()
    .email('Please enter a valid alternate email address')
    .max(128, 'Email cannot exceed 128 characters')
    .nullable(),

  mobileNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]+$/, 'Please enter a valid mobile number')
    .max(32, 'Mobile number cannot exceed 32 characters'),

});