import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
	Controller,
	SubmitHandler,
	useFieldArray,
	useForm,
} from 'react-hook-form'
import { OnChangeValue } from 'react-select'
import Select from 'react-select'

import { MyCrossword } from '@/components/ui/crossword-elements/crossword/Crossword'
import { Button } from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import { Heading } from '@/components/ui/heading/Heading'

import { ICross } from '@/shared/types/crossword.types'

import { CrosswordsService } from '@/services/crosswords.service'

import { convertCrossData } from '@/utils/crossword/convertCrossData'
import { generateSlug } from '@/utils/string/generateSlug'

import { optionsDirection, optionsLevel, optionsNumber } from '../select.data'
import { IOptions } from '../select.types'

export const CrosswordForm = ({
	coursesNames,
	level,
}: {
	coursesNames: IOptions[]
	level?: string
}) => {
	const [options, setOptions] = useState(optionsNumber)
	const [crossData, setCrossData] = useState({ across: {}, down: {} })
	const [levelOption] = useState(optionsLevel)
	const [optDirection, setOptDirection] = useState(optionsDirection)
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		control,
		getValues,
		watch,
	} = useForm<any>({
		mode: 'onChange',
	})

	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
		{
			control,
			name: 'data',
		}
	)

	const { push } = useRouter()

	const createCrossword = useMutation({
		mutationFn: (crossData: ICross) => {
			return CrosswordsService.createCrossword(crossData)
		},
	})
	const onSubmit: SubmitHandler<ICross> = async (e: ICross) => {
		//console.log('cross form ===', e)
		await createCrossword.mutateAsync(e)
		push('/courses')
	}

	const handleGenerateCross = () => {
		const transformedCrossData = convertCrossData(getValues('data'))

		setCrossData(() => transformedCrossData)
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl">
				<div className="max-w-xl">
					<Heading title="Create new crossword" />
					<p>Course</p>

					<Controller
						control={control}
						name={`course`}
						render={({ field: { onChange } }) => (
							<Select
								id="3"
								name="course"
								className="w-48"
								options={coursesNames}
								placeholder="Select"
								onChange={(selectedOption: any) => {
									onChange(selectedOption.value)
								}}
							/>
						)}
					/>

					<div className="flex items-center flex-wrap justify-between py-4">
						<Field
							{...register('title', {
								required: 'Title is required!',
								maxLength: 15,
								onChange: (e) => {
									setValue('slug', generateSlug(e.target.value))
								},
							})}
							placeholder="Title"
							error={errors.title}
						/>

						<Field
							{...register('description', {
								required: 'Description is required!',
							})}
							placeholder="Description"
							error={errors.description}
						/>
						<Field
							{...register('slug', {
								required: 'Slug is required!',
							})}
							placeholder="Slug"
							error={errors.slug}
						/>
					</div>
					<div className="pb-8">
						<p>Complexity</p>
						<Controller
							control={control}
							name={`complexity`}
							render={({ field: { onChange } }) => (
								<Select
									id="6"
									name="complexity"
									className="w-48"
									options={options}
									onChange={(selectedOption: any) => {
										onChange(selectedOption.value)
									}}
								/>
							)}
						/>
					</div>
					<div className="pb-8">
						<p>Level</p>
						<Controller
							control={control}
							name={`level`}
							render={({ field: { onChange } }) => (
								<Select
									id="5"
									name="complexity"
									className="w-48"
									options={levelOption}
									onChange={(selectedOption: any) => {
										onChange(selectedOption.value)
									}}
								/>
							)}
						/>
					</div>
				</div>
				<div className="flex gap-5 flex-wrap">
					{fields.map((field, index) => (
						<div
							key={field.id}
							className="  max-w-md border-2 border-gray-300 rounded mb-2 p-4 text-md"
						>
							<Field
								{...register(`data.${index}.id`, {
									required: 'No is required!',
								})}
								placeholder="No"
								className="h-8"
								style={{ width: '80px' }}
							/>

							<Field
								{...register(`data.${index}.clue`, {
									required: 'Clue is required!',
								})}
								placeholder="Clue"
								error={errors.slug}
								className="h-8"
								style={{ width: '250px' }}
							/>
							<Field
								{...register(`data.${index}.answer`, {
									required: 'Answer is required!',
								})}
								placeholder="Answer"
								error={errors.slug}
								className="h-8"
								style={{ maxWidth: '250' }}
							/>
							<p>Direction</p>
							<Controller
								control={control}
								name={`data.${index}.direction`}
								render={({ field: { onChange } }) => (
									<Select
										id="3"
										name="direction"
										className="w-48"
										options={optDirection}
										placeholder="Select"
										onChange={(selectedOption: any) => {
											onChange(selectedOption.value)
										}}
									/>
								)}
							/>

							<Field
								{...register(`data.${index}.row`, {
									required: 'Row is required!',
									valueAsNumber: true,
								})}
								placeholder="Row"
								error={errors.slug}
								type="number"
								className="h-8"
								style={{ width: '80px' }}
							/>
							<Field
								{...register(`data.${index}.col`, {
									required: 'Col is required!',
									valueAsNumber: true,
								})}
								type="number"
								placeholder="Col"
								error={errors.slug}
								className="h-8"
								style={{ width: '80px' }}
							/>
							<div className="btn-box">
								{fields.length !== 1 && (
									<button
										className="mr10 bg-primary  rounded p-2 text-sm m-2"
										onClick={() => remove(index)}
									>
										Remove
									</button>
								)}
							</div>
						</div>
					))}
				</div>
				<div className="mt-2 mb-10">
					<button
						className="bg-gray-300 p-2 rounded text-sm"
						type="button"
						onClick={() =>
							append({
								id: '',
								clue: '',
								direction: '',
								answer: '',
								row: 0,
								col: 0,
							})
						}
					>
						{' '}
						append
					</button>
				</div>
				<Button
					className=" mr-6"
					colored
					type="button"
					onClick={handleGenerateCross}
				>
					Generate Cross
				</Button>
				<Button colored type="submit">
					Create
				</Button>
			</form>

			{Object.keys(crossData).length > 0 && (
				<MyCrossword
					title={'Test crossword'}
					description={'New crossword'}
					crossData={crossData}
				/>
			)}
		</>
	)
}
