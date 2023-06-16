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

import { toastError } from '@/utils/api/withToastrErrorRedux'
import { convertCrossData } from '@/utils/crossword/convertCrossData'
import { generateSlug } from '@/utils/string/generateSlug'

import { getAdminUrl } from '@/config/url.config'

import { optionsNumber } from '../select.data'
import { ILevelsOption, IOptions } from '../select.types'

export interface ICrossForm {
	course?: string
	slug: string
	description: string
	title: string
	level?: string
	complexity: string | number
	data: ICrossData[]
	lvl: string
	courseTitle?: string
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
		push,
		query: { courseName, cid },
	} = useRouter()

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
		defaultValues: { courseTitle: courseName as string },
	})

	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
		{
			control,
			name: 'data',
		}
	)

	const createCrossword = useMutation({
		mutationFn: (crossData: ICrossForm) => {
			return CrosswordsService.createCrossword(crossData)
		},
		onSuccess() {
			if (courseName) push(`/profile/courses/${cid}`)
			else push(getAdminUrl('crosswords'))
		},
	})
	const onSubmit: SubmitHandler<ICrossForm> = async (e: ICrossForm) => {
		//console.log('cross form ===', e)

		const resCross = { ...e, course: cid ? (cid as string) : e.course }

		await createCrossword.mutateAsync(resCross)
		//push('/courses')
	}

	const handleGenerateCross = () => {
		try {
			const transformedCrossData = convertCrossData(getValues('data'))
			//	console.log('form values === ', getValues('data'))
			setCrossData(transformedCrossData)
		} catch (e) {
			toastError(e, 'Generate Cross')
		}
	}

	//	const selectValue = watch('course')
	const isSubmitDisabled =
		!isValid ||
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

					{!courseName ? (
						<>
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
						</>
					) : (
						<Field
							{...register('courseTitle', {
								required: 'courseTitle is required!',
							})}
							name="courseTitle" // Add this line
							placeholder="Course Title"
							error={errors.courseTitle}
							value={courseName}
							disabled
							inputStyle={{ backgroundColor: '#ade4e4', textAlign: 'center' }}
						/>
					)}

					<div className="flex  flex-col flex-wrap  py-4">
						{!courseName && (
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
						)}
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

				<div className="leading-9 bg-red-600/[0.2] rounded-md p-6 mb-8">
					<p className="text-red-600 font-bold">Achtung!</p>
					Please click <b>&quot;Generate Cross&quot;</b> button{' '}
					<b>before clicking &quot;Create&quot; </b>
					to make sure that all data is correct!
					<p>
						If &quot;Create&quot; button <b>is disabled</b> then maybe you have
						left some fields empty or the values are invalid! <br /> Please
						check all your data one more time
					</p>
					<div className="m-8">
						<h3 className="font-bold">Notice that:</h3>
						<ul className="list-disc">
							<li>
								All numbers must be a{' '}
								<span className="underline">positive integer</span> (Example: 5)
							</li>
							<li>
								Mostly there is no need to change Slug field, as it&apos;s value
								will be generated after you fill in Title field
							</li>
							<li>
								There must be at least 1 Clue in Crossword. Click ADD CLUE to
								add one!
							</li>
						</ul>
					</div>
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
