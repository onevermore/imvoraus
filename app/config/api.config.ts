export const API_URL = `${process.env.REACT_APP_URL}/apii`

export const getAuthUrl = (string: string) => `/auth${string}`
export const getCoursesUrl = (string: string) => `/courses${string}`
export const getTextUrlBySlug = (string: string) => `/texts/by-slug${string}`
export const getUserUrl = (string: string) => `/user${string}`
export const getTextsByCourseURL = (string: string) =>
	`/texts/by-courses${string}`
export const getTextsUrl = (string: string) => `/texts${string}`
export const getDictionaryUrl = (string: string) => `/dictionary${string}`
export const getCrosswordsUrl = (string: string) => `/crosswords${string}`
