import { axiosClassic } from 'api/interceptors'

import { getUserUrl } from '@/config/api.config'

interface IUser {
	_id: string
	isAdmin: boolean
	avatarURL: string
	email: string
	password: string
	username: string
}

export interface IUserEditInput
	extends Omit<IUser, '_id' | 'email' | 'password' | 'isAdmin' | 'avatarURL'> {}

export const UsersService = {
	async getUserDataByUsername(username: string) {
		const res = await axiosClassic.get(getUserUrl(`/${username}`))
		return res.data
	},

	async getAllUsers() {
		const { data } = await axiosClassic.get(getUserUrl(''))
		return data
	},

	async update(username: string, data: IUserEditInput) {
		return axiosClassic.put<string>(getUserUrl(`/${username}`), data)
	},

	async updateAvatar(username: string, data: IUserEditInput) {
		return axiosClassic.put<string>(getUserUrl(`/${username}`), data)
	},


	async uploadAvatar(file: FormData, username: string, subfolder: string) {
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
