import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
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

import { CrossFormPart } from '@/components/ui/crossword-elements/CrossFormPart'
import { MyCrossword } from '@/components/ui/crossword-elements/crossword/Crossword'
import { Button } from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import { DekorHeading } from '@/components/ui/heading-decor/DekorHeading'
import { Heading } from '@/components/ui/heading/Heading'

import { ICrossData } from '@/shared/types/crossword.types'

import { CrosswordsService } from '@/services/crosswords.service'

import { convertCrossData } from '@/utils/crossword/convertCrossData'
import { generateSlug } from '@/utils/string/generateSlug'

import { optionsNumber } from '../select.data'
import { ILevelsOption, IOptions } from '../select.types'

export interface ICrossForm {
	course: string
	slug: string
	description: string
	title: string
	level: string
	complexity: string | number
	data: ICrossData[]
	lvl: string
}

export const CrosswordForm = ({
	coursesNames,
	courseLevels,
}: {
	coursesNames: IOptions[]
	courseLevels: ILevelsOption[]
}) => {
	const [crossData, setCrossData] = useState({ across: {}, down: {} })

	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
		setValue,
		control,
		getValues,
		watch,
	} = useForm<ICrossForm>({
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
		mutationFn: (crossData: ICrossForm) => {
			return CrosswordsService.createCrossword(crossData)
		},
	})
	const onSubmit: SubmitHandler<ICrossForm> = async (e: ICrossForm) => {
		//console.log('cross form ===', e)
		await createCrossword.mutateAsync(e)
		push('/courses')
	}

	const handleGenerateCross = () => {
		const transformedCrossData = convertCrossData(getValues('data'))
		//	console.log('form values === ', getValues('data'))
		setCrossData(transformedCrossData)
	}

	//	const selectValue = watch('course')
	const isSubmitDisabled =
		!isValid ||
		!!errors.course ||
		!!errors.title ||
		!!errors.slug ||
		!!errors.description ||
		fields.length < 1 ||
		!!errors.complexity ||
		fields.some(
			(field, index) =>
				errors.data?.[index]?.id ||
				errors.data?.[index]?.clue ||
				errors.data?.[index]?.answer ||
				errors.data?.[index]?.direction
		)
	//fields.some((field) => !field.clue || !field.answer || !field.direction) ||

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl">
				<div className="max-w-xl">
					<Heading
						className="pt-6 mb-4 md:mb-10"
						title="Create new crossword"
					/>
					<p className="">Course</p>

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
									const res = selectedOption.value
									onChange(res)
									const lvl = courseLevels.filter((v) => v.value === res)[0]
										.level

									setValue('level', lvl)
								}}
							/>
						)}
					/>

					<div className="flex  flex-col flex-wrap  py-4">
						<Field
							{...register('level', {
								required: 'Level is required!',
							})}
							placeholder="Level"
							error={errors.level}
							disabled
							style={{ width: '60px' }}
							inputStyle={{ backgroundColor: '#ade4e4', textAlign: 'center' }}
						/>
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
							style={{ maxWidth: '300px' }}
						/>
					</div>
					<div className="pb-8">
						<p>Complexity</p>
						<Controller
							control={control}
							name={`complexity`}
							rules={{ required: true }}
							render={({ field: { onChange } }) => (
								<Select
									id="6"
									name="complexity"
									className="w-48"
									options={optionsNumber}
									onChange={(selectedOption: any) => {
										onChange(selectedOption.value)
									}}
								/>
							)}
						/>
					</div>
				</div>
				<DekorHeading className="mb-6" text="Clues:" />
				<div className="flex flex-col gap-5 flex-wrap">
					{fields.map((field, index, f) => (
						<CrossFormPart
							key={field.id}
							index={index}
							register={register}
							remove={remove}
							errors={errors}
							control={control}
						/>
					))}
				</div>
				<div className="mt-2 mb-10">
					<Button
						rose
						type="button"
						onClick={() => {
							append({
								id: fields.length + 1,
								clue: '',
								direction: '',
								answer: '',
								row: 0,
								col: 0,
							})
						}}
					>
						{' '}
						ADD CLUE
					</Button>
				</div>
				<div className="mb-10">
					<Button
						className=" mr-6"
						colored
						type="button"
						onClick={handleGenerateCross}
					>
						Generate Cross
					</Button>
					<Button colored type="submit" disabled={isSubmitDisabled}>
						Create
					</Button>
				</div>
			</form>

			{(Object.keys(crossData.across).length > 0 ||
				Object.keys(crossData.down).length > 0) && (
				<MyCrossword
					title={'Test crossword'}
					description={'New crossword'}
					crossData={crossData}
					filled
				/>
			)}
		</>
	)
}
