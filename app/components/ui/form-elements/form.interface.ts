import { ButtonHTMLAttributes } from 'react'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IButtonn {
	className?: string
	size?: 'small' | 'medium' | 'large'
}
