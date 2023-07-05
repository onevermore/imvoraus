import Text from './Text'
import { useUsersDictionary } from './useUsersDictionary'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
//import Tooltip from 'react-tooltip'
import { Tooltip } from 'react-tooltip'
import ReactTooltip from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import { SkeletonLoader } from '@/components/ui/skeleton-loader/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import { IAddWord, IDictionaryFull } from '@/shared/types/dictionary.types'
import { ITextPart } from '@/shared/types/text.types'

import { DictionaryService } from '@/services/dictionary.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'

import TextDictionary from '../Dictionary/TextDictionary'
import { useTranslation } from '../translation/useTranslation'
import { DekorHeading } from '../ui/heading-decor/DekorHeading'
import Loader from '../ui/loaders/MiniLoader'

interface ITranslate {
	word: string
	translation: string
}

const TextWithDictionary: FC<ITextPart> = ({ _id, title, text, course }) => {
	const { user } = useAuth()
	const queryClient = useQueryClient()
	const [list, setList] = useState<ITranslate[]>([])
	//	const [word, setWord] = useState('')
	const {
		isSuccess,
		data,
		word: myWord,
		error,
		setWord,
		isLoading,
	} = useTranslation()

	const translatedText = data?.responseData?.translatedText

	const {
		dictionaryList,
		addWordAsync,
		deleteWordAsync,
		isLoadingDeleteWord,
		isSuccessDeleteWord,
	} = useUsersDictionary(user?._id, _id)

	const onAddWordtoDictionary = async () => {
		const newWordData = {
			userId: user?._id || '',
			courseId: course,
			textId: _id,
			word: myWord,
			translation: translatedText,
		}

		await addWordAsync(newWordData)
	}

	const onClick = (value: string) => {
		//console.log('click on word TextWithDic = ', value)
		setWord(value)
	}

	return (
		<>
			{
				<Tooltip
					id="foo"
					clickable={true}
					events={['click']}
					render={({ content, activeAnchor }) => {
						//	console.log('tooltip content === ', content)
						//		console.log('tooltip activeAnchor === ', activeAnchor)
						return (
							<div className="w-full flex-center-between flex-wrap ">
								<div>
									<span className="font-bold">
										{`${myWord?.toUpperCase()} `}{' '}
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
										onClick={() => onAddWordtoDictionary()}
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
			}

			<DekorHeading text={title} />
			<Text text={text} onClick={onClick} />
			<br />

			<TextDictionary
				list={dictionaryList || []}
				removeHandler={deleteWordAsync}
				deleteIsLoading={isLoadingDeleteWord}
				isSuccessDeleteWord={isSuccessDeleteWord}
			/>
		</>
	)
}

export default TextWithDictionary
