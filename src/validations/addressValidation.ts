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