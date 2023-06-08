import { Role } from '@/store/user/user.interface'

export interface IUser {
	_id: string
	username: string
	email: string
	password: string
	createdAt: string
	//isAdmin: boolean
	avatarURL: string
	birthdate: Date
	roles: Role[]
}
