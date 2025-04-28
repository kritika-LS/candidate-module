import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .max(128, 'Please enter a valid email address')
    .required('Please enter a valid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(256, 'Input too long. Maximum allowed: 256 characters'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match. Please enter the same password')
    .required('Please confirm your password'),
});
