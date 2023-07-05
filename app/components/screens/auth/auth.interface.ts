export interface IAuth {
	email: string
	password: string
}

export interface IReg extends IAuth {
	birthdate: Date
	username: string
}

export interface IRegFull extends IReg {
	passwordConfirm: string
}
