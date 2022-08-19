export const API_URL = `${process.env.REACT_APP_URL}/api`

export const getAuthUrl = (string: string) => `/auth${string}`
export const getCoursesUrl = (string: string) => `/courses${string}`
