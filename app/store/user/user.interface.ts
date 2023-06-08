import { IUser } from '@/shared/types/user.types'

export enum Role {
	Admin = 'admin',
	User = 'user',
	Super = 'super',
}

export interface IUserState {
	_id: string
	email: string
	/*isAdmin: boolean*/
	username: string
	//avatarURL: string
	birthdate: Date
	roles: Role[]
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IUserInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface InterfaceEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
