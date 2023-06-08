import Text from './Text'
import { FC, useEffect, useState } from 'react'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
//import Tooltip from 'react-tooltip'
//import { Tooltip } from 'react-tooltip'
import ReactTooltip from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import { SkeletonLoader } from '@/components/ui/skeleton-loader/SkeletonLoader'

import TextDictionary from '../Dictionary/TextDictionary'
import { useTranslation } from '../translation/useTranslation'
import { DekorHeading } from '../ui/heading-decor/DekorHeading'
import Loader from '../ui/loaders/MiniLoader'

export interface ITranslate {
	word: string
	translation: string
}

interface iTextProps {
	id?: string
	title: string
	text: string
}

export const TextWithDictionary2: FC<iTextProps> = ({ id, title, text }) => {
	const [list, setList] = useState<ITranslate[]>([])
	//	const [word, setWord] = useState('')
	const { isSuccess, data, word, error, setWord, isLoading } = useTranslation()

	//console.count('TextWithDictionary render')

	const translatedText = data?.responseData?.translatedText
	//	console.log('translatedText in TextWithDictionary = ', translatedText)
	/*	useEffect(() => {
		const listt = localStorage.getItem(title)
		if (listt) {
			setList(JSON.parse(listt))
		}
	}, [])

	useEffect(() => {
		//console.count('effect list')
		window.localStorage.setItem(title, JSON.stringify(list))
	}, [list])
*/
	const addWordToDictionary = () => {
		//	setWord(tip)
		if (translatedText) {
			setList([
				...list,
				{
					word: 'g',
					translation: translatedText,
				},
			])
		}
	}
	const onClick = (value: string) => {
		//console.log('click on word TextWithDic = ', value)
		setWord(value)
	}

	return (
		<>
			{isSuccess && <h1>SUCCESS !!!</h1>}
			{isLoading && <h1>LOADING......</h1>}

			{/*
				<Tooltip
					id="foo"
					clickable={true}
					events={['click']}
					render={({ content, activeAnchor }) => {
						console.log('tooltip content === ', content)
						console.log('tooltip activeAnchor === ', activeAnchor)
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
				*/}

			<DekorHeading text={title} />
			<Text text={text} onClick={onClick} />
			<br />

			{/*	<TextDictionary list={list} setList={setList} /> */}
		</>
	)
}
