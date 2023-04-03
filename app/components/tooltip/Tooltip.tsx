import Text from './Text'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'

import Dictionary from '../Dictionary/Dictionary'
import { useTranslation } from '../translation/useTranslation'

import s from './Tooltip.module.scss'

//import ReactTooltip from 'react-tooltip'

const ReactTooltip = dynamic(() => import('react-tooltip'), {
	ssr: false,
})
interface ITranslate {
	word: string
	translation: string
}

export const Tooltip: FC<{ title: string; text: string }> = ({
	title,
	text,
}) => {
	const [list, setList] = useState<ITranslate[]>([])
	const { isSuccess, data, word, error, setWord, isLoading } = useTranslation()

	console.count('render')

	useEffect(() => {
		const listt = localStorage.getItem('list')
		if (listt) {
			console.count('effect empty')
			setList(JSON.parse(listt))
		}
		//	ReactTooltip.rebuild();
	}, [])

	useEffect(() => {
		console.count('effect list')
		window.localStorage.setItem('list', JSON.stringify(list))
	}, [list])

	const addWordToDictionary = () => {
		//	setWord(tip)
		if (data?.responseData && data?.responseData?.translatedText) {
			setList([
				...list,
				{
					word: word,
					translation: data?.responseData.translatedText,
				},
			])
		}
	}
	const onClick = (value: string) => {
		setWord(value)
	}

	return (
		<>
			<ReactTooltip
				id="foo"
				type="error"
				isCapture={true}
				clickable={true}
				globalEventOff="click"
				multiline={true}
				getContent={(dataTip) => {
					console.log('my data is: ', data?.responseData)
					return data?.responseData ? (
						<div className="flex-center-between flex-wrap">
							<span className="font-bold">
								{`${word?.toUpperCase()} `}{' '}
								<p>{data.responseData?.translatedText?.toUpperCase()}</p>
							</span>{' '}
							{data.responseData?.translatedText ? (
								<button
									className="border rounded p-1 ml-5"
									onClick={() => addWordToDictionary()}
								>
									<b>Add +</b>
								</button>
							) : (
								<div>{` Not found`}</div>
							)}
						</div>
					) : null
				}}
			/>
			<h1>{title}</h1>
			<Text text={text} onClick={onClick} />
			<br />

			<Dictionary list={list} setList={setList} />
		</>
	)
}
