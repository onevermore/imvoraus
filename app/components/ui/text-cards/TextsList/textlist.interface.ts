import { ITextData } from '../TextCard/text.interface'

export interface ITextListData {
	_id: string
	title: string
	description: string
	texts: ITextData[]
}
