import * as yup from 'yup';

export const addressValidationSchema = yup.object().shape({
  isSamePhysical: yup.boolean(),
  physicalAddress: yup.object().shape({
    address1: yup
      .string()
      .required('Physical address is required'),
    city: yup
      .string()
      .required('City is required'),
    stateCode: yup
      .string()
      .required('State is required'),
    zipCode: yup
      .string()
      .required('ZIP code is required')
      .matches(/^\d{5}$/, 'ZIP code must be 5 digits'),
    countryCode: yup
      .string()
      .required('Country is required'),
  }),
  mailingAddress: yup.object().shape({
    address1: yup
      .string()
      .required('Mailing address is required'),
    city: yup
      .string()
      .required('City is required'),
    stateCode: yup
      .string()
      .required('State is required'),
    zipCode: yup
      .string()
      .required('ZIP code is required')
      .matches(/^\d{5}$/, 'ZIP code must be 5 digits'),
    countryCode: yup
      .string()
      .required('Country is required'),
  }),
});

const addressShape = yup.object().shape({
  address1: yup.string().required('Address is required'),
  address2: yup.string(), // Optional
  city: yup.string().required('City is required'),
  zipCode: yup.string()
    .matches(/^\d{4,10}$/, 'Zip Code must be 4-10 digits')
    .required('Zip Code is required'),
  stateCode: yup.string().required('State is required'),
  countryCode: yup.string().required('Country is required'),
});

export const addressValidationSchema2 = yup.object().shape({
  currentAddress: addressShape,
  permanentAddress: addressShape,
  isSamePermanent: yup.boolean(),
  notes: yup.string().max(1024, 'Maximum 1024 characters allowed'),
  permanentNotes: yup.string().max(1024, 'Maximum 1024 characters allowed'),
});

export const addressValidationSchema3 = yup.object().shape({
  firstName: yup
    .string()
    .max(128, 'First name must be less than 128 characters')
    .required('First name is required'),
  middleName: yup
    .string()
    .max(128, 'Middle name must be less than 128 characters')
    .nullable(),
  lastName: yup
    .string()
    .max(128, 'Last name must be less than 128 characters')
    .required('Last name is required'),
  relationship: yup
    .string()
    .max(128, 'Relationship must be less than 128 characters')
    .required('Relationship is required'),
  mobileNumber: yup
    .string()
    .matches(/^\+?[0-9]{1,16}$/, 'Please enter a valid mobile number')
    .required('Mobile number is required'),
  alternateMobileNumber: yup
    .string()
    .matches(/^\+?[0-9]{1,16}$/, 'Please enter a valid mobile number')
    .nullable(),
  workPhoneNumber: yup
    .string()
    .matches(/^\+?[0-9]{1,16}$/, 'Please enter a valid phone number')
    .nullable(),
  extensionNumber: yup
    .string()
    .matches(/^[0-9]{1,16}$/, 'Extension number must be numeric and less than 16 digits')
    .nullable(),
  address: yup.object().shape({
    address: yup
      .string()
      .required('Address is required')
      .max(80, 'Exceeded maximum character length of 80'),
    city: yup.string().required('City is required'),
    zipCode: yup
      .string()
      .matches(/^\d{4,10}$/, 'Zip Code must be 4-10 digits')
      .required('Zip Code is required'),
    stateCode: yup.string().required('State is required'),
    countryCode: yup.string().required('Country is required'),
  }),
  notes: yup.string().max(1024, 'Notes cannot exceed 1024 characters'),
});
