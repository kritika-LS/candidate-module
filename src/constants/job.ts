export const JOB_LIST_SIZE = 10

export const JOB_TYPE_LEVELS = {
  FT: 'Full Time',
  PT: 'Part Time',
  FL: 'Contract/Freelance',
  IN: 'Internship',
  OT: 'Others',
  "":""
} as const

export const PAYRATE = {
  HR: 'Hourly',
  DA: 'Daily',
  WK: 'Weekly',
  FN: 'Fortnightly',
  MN: 'Monthly',
  '': '',
} as const

export const PAYRATEV2 = {
  HR: 'Hour',
  DA: 'Day',
  WK: 'Week',
  FN: 'Fortnight',
  MN: 'Month',
  '': '',
} as const

export enum SORT_BY {
  'RELEVANCE' = 'RELEVANCE',
  'NEWEST' = 'NEWEST',
  'PAYRATE' = 'PAYRATE',
}

export const EmploymentType = [
  'Interim Leadership',
  'Travel',
  'Per Diem',
  'Permanent',
] as const

export const DURATION = {
  D: 'Day',
  W: 'Week',
  Y: 'Year',
  M: 'Month',
  '': '-',
} as const
