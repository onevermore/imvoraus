import {
	ButtonHTMLAttributes,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react'
import { FieldError } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	size?: 'small' | 'medium' | 'large'
	colored?: boolean
	rose?: boolean
	primary?: boolean
}
/*
export interface IButtonn {
	className?: string
	size?: 'small' | 'medium' | 'large'
	colored?: boolean
}
*/

export interface IFieldProps {
	placeholder: string
	error?: any
	inputStyle?: any
}
//FieldError | undefined
type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps
type TypeTextAreaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps

export interface ITextArea extends TypeTextAreaPropsField {}

export interface IField extends TypeInputPropsField {}

export interface IUploadField {
	folder: string
	image?: string
	error: any
	onChange: (...event: any[]) => void
	placeholder: string
	isNoImage?: boolean
}
