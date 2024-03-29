import { FC, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import TextDictionary from '@/components/Dictionary/TextDictionary'
import { DekorHeading } from '@/components/ui/heading-decor/DekorHeading'

import { useAuth } from '@/hooks/useAuth'

import { Meta } from '@/utils/meta/Meta'

import { useUsersDictionary } from '../../TextWithDictionary/useUsersDictionary'

export const WordsList: FC = () => {
	const [val, setVal] = useState('')

	const handleInput = (e: any) => {
		setVal(e.target.value)
	}

	const { user } = useAuth()

	const {
		dictionaryList,
		deleteWordAsync,
		isLoadingDeleteWord,
		isSuccessDeleteWord,
	} = useUsersDictionary(user?._id || '')

	return (
		<Meta
			title="Learn new words"
			description="Learn new words from your dictionary"
		>
			<DekorHeading text="Dictionary" className="text-center" />

			{
				<TextDictionary
					list={dictionaryList}
					removeHandler={deleteWordAsync}
					deleteIsLoading={isLoadingDeleteWord}
					isSuccessDeleteWord={isSuccessDeleteWord}
				/>
			}
		</Meta>
	)
}
