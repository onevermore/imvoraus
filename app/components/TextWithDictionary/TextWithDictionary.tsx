import Text from './Text'
import { FC, useEffect, useState } from 'react'
//import Tooltip from 'react-tooltip'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import { SkeletonLoader } from '@/components/ui/skeleton-loader/SkeletonLoader'

import TextDictionary from '../Dictionary/TextDictionary'
import { useTranslation } from '../translation/useTranslation'
import { DekorHeading } from '../ui/heading-decor/DekorHeading'
import Loader from '../ui/loaders/MiniLoader'

interface ITranslate {
	word: string
	translation: string
}

interface iTextProps {
	id?: string
	title: string
	text: string
}

export const TextWithDictionary: FC<iTextProps> = ({ id, title, text }) => {
	const [list, setList] = useState<ITranslate[]>([])
	//	const [word, setWord] = useState('')
	const { isSuccess, data, word, error, setWord, isLoading } = useTranslation()

	console.count('render')

	const translatedText = data?.responseData?.translatedText

	useEffect(() => {
		const listt = localStorage.getItem(title)
		if (listt) {
			setList(JSON.parse(listt))
		}
	}, [])

	useEffect(() => {
		//console.count('effect list')
		window.localStorage.setItem(title, JSON.stringify(list))
	}, [list])

	const addWordToDictionary = () => {
		//	setWord(tip)
		if (translatedText) {
			setList([
				...list,
				{
					word: word,
					translation: translatedText,
				},
			])
		}
	}
	const onClick = (value: string) => {
		setWord(value)
	}

	return (
		<>
			{true && (
				<Tooltip
					id="foo"
					//type="error"

					clickable={true}
					events={['click']}
					render={({ content, activeAnchor }) => {
						console.log('tooltip content === ', content)
						console.log('tooltip activeAnchor === ', activeAnchor)
						/*	const spanElement = activeAnchor?.querySelector('span')
						console.log('span === ', spanElement)
						console.log('span data === ', spanElement?.getAttribute('data-tip'))
						//console.log('my data is: ', data?.responseData)*/
						return (
							<div className="w-full flex-center-between flex-wrap ">
								<div>
									<span className="font-bold">
										{`${word?.toUpperCase()} `}{' '}
									</span>
									<div>
										{translatedText ? (
											translatedText?.toUpperCase()
										) : (
											<SkeletonLoader count={1} className="h-8 bg-primary" />
										)}
									</div>
								</div>

								{translatedText ? (
									<button
										className="border rounded p-1 ml-5"
										onClick={() => addWordToDictionary()}
									>
										<b>Add +</b>
									</button>
								) : (
									<Loader />
								)}
							</div>
						)
					}}
				/>
			)}

			<DekorHeading text={title} />
			<Text text={text} onClick={onClick} />
			<br />

			<TextDictionary list={list} setList={setList} />
		</>
	)
}
