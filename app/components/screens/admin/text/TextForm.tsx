import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select, { OnChangeValue } from 'react-select'

import { Button } from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import { TextArea } from '@/components/ui/form-elements/TextArea'
import { Heading } from '@/components/ui/heading/Heading'

import { IText, ITextForm } from '@/shared/types/text.types'

import { TextsService } from '@/services/texts.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'
import { generateSlug } from '@/utils/string/generateSlug'

import { getAdminUrl } from '@/config/url.config'

import { IOptions, IOptions2 } from '../select.types'

export const TextForm = ({ coursesNames }: { coursesNames: IOptions[] }) => {
	const optionss: IOptions[] = [
		{ value: '1', label: '1' },
		{ value: '2', label: '2' },
		{ value: '3', label: '3' },
		{ value: '4', label: '4' },
		{ value: '5', label: '5' },
	]
	const [options, setOptions] = useState(optionss)
	const [courseIdOption, setCourseIdOption] = useState('')
	const [complexityOption, setComplexityOption] = useState(0)

	const {
		push,
		query: { courseName, cid },
	} = useRouter()

	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<any>({
		mode: 'onChange',
		defaultValues: { courseTitle: courseName },
	})

	const createText = useMutation({
		mutationFn: (textData: IText) => {
			return TextsService.createText(textData)
		},
		onSuccess() {
			if (courseName) push(`/profile/courses/${cid}`)
			else push(getAdminUrl('texts'))
		},
		onError: (error, variables, context) => {
			toastError(error, 'Create text')
		},
	})
	const onSubmit: SubmitHandler<IText> = async (e: ITextForm) => {
		const res: IText = {
			...e,
			course: cid ? (cid as string) : courseIdOption,
			complexity: complexityOption,
		}

		await createText.mutateAsync(res)

		//	console.log('all e === ', e)
	}

	const handleCourseSelect = (e: OnChangeValue<IOptions, boolean>) => {
		setCourseIdOption((e as IOptions2).value)
		//console.log('selected course ID : ', (e as IOptions).value)
	}

	const handleComplexitySelect = (e: OnChangeValue<IOptions, boolean>) => {
		setComplexityOption(Number((e as IOptions).value))
		//	console.log('selected complexity : ', (e as IOptions).value)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
			<Heading title="Create new text" className="mb-6" />
			{!courseName ? (
				<Select
					id="1"
					className="w-64"
					options={coursesNames}
					placeholder="Select course"
					onChange={handleCourseSelect}
				/>
			) : (
				<Field
					{...register('courseTitle')}
					name="courseTitle" // Add this line
					placeholder="Course Title"
					error={errors.courseTitle}
					value={courseName}
					disabled
					inputStyle={{ backgroundColor: '#ade4e4', textAlign: 'center' }}
				/>
			)}
			<div className="flex  items-center flex-wrap justify-between py-4">
				<Field
					{...register('title', {
						required: 'Title is required!',
						validate: {
							maxLength: (v) =>
								v.length <= 40 || 'Title should have at most 40 characters',
						},
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

				<TextArea
					placeholder="Text"
					{...register('text', { required: 'Text is required!' })}
				/>
				<Field
					{...register('slug', {
						required: 'Slug is required!',
					})}
					placeholder="Slug"
					error={errors.slug}
				/>
				<div></div>
			</div>
			<div className="pb-8">
				<div>Complexity:</div>
				<Select
					id="2"
					className="w-48"
					options={options}
					name="complexity"
					onChange={handleComplexitySelect}
				/>
			</div>
			<Button colored type="submit">
				Create
			</Button>
		</form>
	)
}
