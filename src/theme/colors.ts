import { blue } from "react-native-reanimated/lib/typescript/Colors";

export const colors = {
  primary: {
    main: '#015CCB',
    light: '#9C87D4',
    dark: '#4A1269',
  },
  secondary: {
    main: '#015CCB',
    light: '#B8A8E1',
    dark: '#7A68A8',
  },
  neutral: {
    main: '#D8C6A1',
    light: '#F9F4F0',
    dark: '#BEA987',
  },
  accent: {
    main: '#FFB77A',
    light: '#FFCDA1',
    dark: '#FF9F52',
  },
  green: {
    main: '#00AE52',
    light: '#CCEFDC',
    success_100: '#00AE52',
    accent: '#00796B',
  },
  blue_light: '#E8F4FF',
  grey: {
    40: '#DBDCDF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    cc: '#ccc',
    light: '#F8F9FA',
    g100: '#F8F9FA',
    A5: '#A5A5A5',
    EDEF: '#EDEDEF'
  },
  text: {
    primary: '#1F1F1F',
    secondary: '#666666',
    heading:'#000000',
    dark:'#005CCB',
    disabled: '#424242',
    white: '#FFFFFF',
    light: '#797979',
    lightBold: '#4c4c4c'
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    dark: '#2C2C2C',
  },
  status: {
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#9C87D4',
    success: '#34C759',
  },
  blue: {
    light: '#347CD5',
  }
};

export type AppColors = typeof colors;
