import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select, { OnChangeValue } from 'react-select'

import { Button } from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import { Heading } from '@/components/ui/heading/Heading'

import { IText, ITextForm } from '@/shared/types/text.types'

import { TextsService } from '@/services/texts.service'

export interface IOptions {
	value: string
	label: string
}

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
		handleSubmit,
		register,
		formState: { errors },
		getValues,
	} = useForm<any>({
		mode: 'onChange',
	})
	const { push } = useRouter()

	const createText = useMutation({
		mutationFn: (textData: IText) => {
			return TextsService.createText(textData)
		},
	})
	const onSubmit: SubmitHandler<IText> = async (e: ITextForm) => {
		const res: IText = {
			...e,
			course: courseIdOption,
			complexity: complexityOption,
		}

		await createText.mutateAsync(res)
		push('/courses')
	}

	const handleCourseSelect = (e: OnChangeValue<IOptions, boolean>) => {
		setCourseIdOption((e as IOptions).value)
		console.log('selected course ID : ', (e as IOptions).value)
	}

	const handleComplexitySelect = (e: OnChangeValue<IOptions, boolean>) => {
		setComplexityOption(Number((e as IOptions).value))
		console.log('selected complexity : ', (e as IOptions).value)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
			<Heading title="Create new text" />
			<Select
				id="1"
				className="w-64"
				options={coursesNames}
				placeholder="Select course"
				onChange={handleCourseSelect}
			/>
			<div className="flex  items-center flex-wrap justify-between py-4">
				<Field
					{...register('title', {
						required: 'Title is required!',
						maxLength: 15,
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
					{...register('text', {
						required: 'Text is required!',
					})}
					placeholder="Text"
					error={errors.level}
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
