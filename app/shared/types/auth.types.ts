import { NextPage } from 'next'

export type TypeRoles = {
	isAdmin?: boolean
	isUser?: boolean
	isSuper?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = {
	children: React.ReactNode
	Component: TypeRoles
}
