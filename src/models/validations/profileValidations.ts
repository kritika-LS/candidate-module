import * as yup from 'yup';

export const personalInfoValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in format XXX-XXX-XXXX'),
  whenCanYouChat: yup.string().nullable().optional(),
});


export const addressValidationSchema = yup.object().shape({
  physicalAddress: yup.object().shape({
    address1: yup
    .string()
    .required('Address is required')
    .max(80, 'Exceeded maximum character length of 80'),
    address2: yup
    .string()
    .nullable()
    .max(80, 'Exceeded maximum character length of 80'),
    city: yup.string().required('City is required'),
    stateCode: yup.string().required('State is required'),
    zipCode: yup
      .string()
      .required('Zip code is required'),
    countryCode: yup.string().required('Country is required'),
  }),
  mailingAddress: yup.object().shape({
    address1: yup
    .string()
    .max(80, 'Exceeded maximum character length of 80')
    .when('isSamePhysical', {
      is: (value: boolean) => value === false,
      then: schema => schema.required('Address line 1 is required'),
      otherwise: schema => schema.nullable(),
    }),
    address2: yup
    .string()
    .max(80, 'Exceeded maximum character length of 80')
    .nullable(),
    city: yup.string().when('isSamePhysical', {
      is: (value: boolean) => value === false,
      then: schema => schema.required('City is required'),
      otherwise: schema => schema.nullable(),
    }),
    stateCode: yup.string().when('isSamePhysical', {
      is: (value: boolean) => value === false,
      then: schema => schema.required('State is required'),
      otherwise: schema => schema.nullable(),
    }),
    zipCode: yup.string().when('isSamePhysical', {
      is: (value: boolean) => value === false,
      then: schema =>
        schema
          .required('Zip code is required')
          .matches(
            /^\d{5}(-\d{4})?$/,
            'Zip code must be in format XXXXX or XXXXX-XXXX',
          ),
      otherwise: schema => schema.nullable(),
    }),
    countryCode: yup.string().when('isSamePhysical', {
      is: (value: boolean) => value === false,
      then: schema => schema.required('Country is required'),
      otherwise: schema => schema.nullable(),
    }),
  }),
  isSamePhysical: yup
    .boolean()
    .required(
      'Please specify if mailing address is the same as physical address',
    ),
});

export const submittalInfoValidationSchema = yup.object().shape({
  dob: yup
    .string()
    .required('Date of birth is required')
    .test('valid-date', 'Please enter a valid date', function (value) {
      if (!value) {return false;}
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test(
      'dob-age-validation',
      'You must be at least 18 years old',
      function (value) {
        if (!value) {return false;}
        const date = new Date(value);
        const today = new Date();
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate(),
        );
        return date <= eighteenYearsAgo;
      },
    ),
  ssn: yup
    .string()
    .required('SSN is required')
    .matches(/^\d{3}-\d{2}-\d{4}$/, 'SSN must be in format XXX-XX-XXXX'),
  ihaveVerifiedMySSN: yup.boolean(),
});

export const eeocVeteranValidationSchema = yup.object().shape({
  genderID: yup.number().nullable().required('Gender is required'),
  raceOrEthnicityID: yup
    .number()
    .nullable()
    .required('Race/Ethnicity is required'),
  armedForcesServiceMedal: yup.number().nullable(),
  recentlySeparatedVeteran: yup.boolean().nullable(),
  militarySeparationDate: yup
    .string()
    .nullable()
    .when('recentlySeparatedVeteran', {
      is: (value: boolean) => value === true,
      then: schema => schema.required('Military separation date is required'),
      otherwise: schema => schema.nullable(),
    }),
  specialDisabledVeteran: yup.boolean().nullable(),
});
