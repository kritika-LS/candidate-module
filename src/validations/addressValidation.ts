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
