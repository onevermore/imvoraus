import { TypeMaterialIcon } from '@/shared/types/icon.types'

export interface IMenuItem {
	icon: TypeMaterialIcon
	title: string
	link: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}
