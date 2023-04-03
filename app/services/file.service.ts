import { axiosClassic } from 'api/interceptors'

export const FileService = {
	async upload(file: FormData, username: string = 'user2', subfolder: string) {
		return axiosClassic.post<{ url: string; name: string }>(
			'/user/avatar',
			file,
			{
				params: {
					username,
				},
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
	},
}
