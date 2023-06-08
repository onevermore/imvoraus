import { useTextEdit } from './useTextEdit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select, { OnChangeValue } from 'react-select'

import { Button } from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import { Heading } from '@/components/ui/heading/Heading'

import { IText } from '@/shared/types/text.types'

import { generateSlug } from '@/utils/string/generateSlug'

import { optionsLevel } from '../select.data'
import { IOptions } from '../select.types'

export const TextEdit = () => {
	const optionss: IOptions[] = [
		{ value: 0, label: ' ' },
		{ value: 1, label: '1' },
		{ value: 2, label: '2' },
		{ value: 3, label: '3' },
		{ value: 4, label: '4' },
		{ value: 5, label: '5' },
	]

	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
		setValue,
		control,
	} = useForm<IText>({
		mode: 'onChange',
	})
	const { push } = useRouter()
	const { onSubmit, isLoading, comp } = useTextEdit(setValue)
	const [complexity, setComplexity] = useState(comp)

	useEffect(() => {
		setComplexity(comp)
	}, [comp])
	//console.log('errors = ', errors)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
			<Heading title="Edit text" />
			{isLoading && <div>isLoading.........</div>}

			<Field
				{...register('course', {
					required: 'Course is required!',
				})}
				disabled
				placeholder="Course"
				error={errors.description}
			/>

			<div className="flex  items-center flex-wrap justify-between py-4">
				<Field
					{...register('title', {
						required: 'Title is required!',
						maxLength: {
							value: 30,
							message: 'Title must be no longer than 30 characters!',
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

				<textarea
					className="w-[100%] h-64"
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
				<label htmlFor="6">Complexity:</label>
				<Controller
					control={control}
					name={`complexity`}
					rules={{ required: true }}
					render={({ field: { onChange } }) => (
						<Select
							id="6"
							name="complexity"
							className="w-48"
							value={
								complexity
									? { value: complexity, label: complexity }
									: optionss[0]
							}
							options={optionss}
							onChange={(selectedOption: any) => {
								setComplexity(+selectedOption.value)
								onChange(+selectedOption.value)
							}}
						/>
					)}
				/>
			</div>
			<Button colored type="submit">
				Save
			</Button>
		</form>
	)
}
