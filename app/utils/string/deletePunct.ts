export const deletePunct = (str: string) => {
	return str.replace(/[;,!?.]/g, '')
}
