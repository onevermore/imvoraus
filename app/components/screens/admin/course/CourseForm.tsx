import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select, { OnChangeValue } from 'react-select'
import CreatableReactSelect from 'react-select/creatable'

import { Button } from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import { MultiSelect } from '@/components/ui/form-elements/MultiSelect'
import { TextArea } from '@/components/ui/form-elements/TextArea'
import { Heading } from '@/components/ui/heading/Heading'

import { useAuth } from '@/hooks/useAuth'

import { ICourse } from '@/shared/types/create-course.types'

import { CoursesService } from '@/services/courses.service'

import { toastError } from '@/utils/api/withToastrErrorRedux'
import { generateSlug } from '@/utils/string/generateSlug'

import { optionsLevel, optionsLevel2 } from '../select.data'

interface INewStudent {
	id: string
	label: string
}

export const CourseForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		control,
	} = useForm<ICourse>({
		mode: 'onChange',
		defaultValues: {
			isPublic: true,
			price: 0,
		},
	})
	const { push } = useRouter()
	const { user } = useAuth()

	const [usernames, setUsernames] = useState<INewStudent[]>([])

	const create = useMutation({
		mutationFn: (courseData: ICourse) => {
			return CoursesService.createCourse(courseData)
		},
		onError: (error, variables, context) => {
			toastError(error, 'Create course')
		},
		onSuccess(data, variables, context) {
			//console.log('UUUU ', data)
			push(`/profile/courses/${data._id}`)
		},
	})

	const onSubmit: SubmitHandler<ICourse> = async (e: ICourse) => {
		const allUsernames = usernames.map((v) => v.label)
		const courseFormData = {
			...e,
			price: +e.price,
			ownerId: user ? user._id : '',
			allowedUsers: allUsernames,
			...(allUsernames.length > 0 && { allowedUsers: allUsernames }),
		}
		//	console.log('course create data ====== ', courseFormData)
		//	await create.mutateAsync(courseFormData)

		await create.mutateAsync(courseFormData)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-md sm:max-w-full 2xl:max-w-5xl "
		>
			<Heading title="Create new course" />
			<div className="flex flex-col sm:flex-row items-start flex-wrap justify-between py-12 my-8 px-12 gap-4 bg-teal-900/[.2] rounded-xl">
				<div className="flex flex-col gap-4 ">
					<Field
						{...register('title', {
							required: 'Title is required!',
							validate: {
								minLength: (v) =>
									v.length >= 2 ||
									'The title should have at least 2 characters',
								maxLength: (v) =>
									v.length <= 30 ||
									'The title should have at most 30 characters',
							},

							onChange: (e) => {
								setValue('slug', generateSlug(e.target.value))
							},
						})}
						placeholder="Title"
						error={errors.title}
					/>

					<TextArea
						{...register('description', {
							required: 'Description is required!',
							validate: {
								minLength: (v) =>
									v.length >= 10 ||
									'Description should have at least 10 characters',
								maxLength: (v) =>
									v.length <= 150 ||
									'Description should have at most 150 characters',
							},
						})}
						placeholder="Description"
						error={errors.description}
					/>

					<div>
						<label htmlFor="6">Level:</label>
						<Controller
							control={control}
							name="level"
							rules={{ required: 'Level is required' }}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<div>
									<Select
										className="w-48"
										options={optionsLevel}
										onChange={(option: any) => {
											onChange(option.value)
										}}
										value={optionsLevel.find(
											(option) => option.value === value
										)}
									/>
									{error && (
										<span className="text-red-600 text-sm">
											{error.message}
										</span>
									)}
								</div>
							)}
						/>
					</div>
				</div>

				<div className="flex flex-col  gap-4">
					<Field
						{...register('price', {
							required: 'Price is required!',
							validate: {
								min: (v) => v >= 0 || 'The min price is 0',
								max: (v) => v < 100 || 'Max price is 99',
							},
						})}
						type="number"
						step="any"
						placeholder="Price"
						error={errors.price}
					/>
					<div className="pb-8 ">
						<Controller
							control={control}
							name="isPublic"
							render={({ field }) => (
								<>
									<label
										htmlFor="isPublic"
										className="flex flex-row gap-8 my-4 "
									>
										<span>Is Public Course:</span>
										<input
											className="w-6 h-6 mt-1"
											type="checkbox"
											checked={field.value}
											onChange={(e) => {
												field.onChange(e.target.checked)
												setUsernames([])
											}}
										/>
									</label>
									{!field.value && (
										<div className="bg-primary/[.4] p-4 rounded-lg w-96 ">
											<MultiSelect
												title="Students' usernames"
												value={usernames}
												setValue={setUsernames}
											/>
										</div>
									)}
								</>
							)}
						/>
					</div>

					<Field
						{...register('slug', {
							required: 'Slug is required!',
						})}
						placeholder="Slug"
						error={errors.slug}
						disabled={true}
					/>
				</div>
			</div>
			<Button colored type="submit">
				Create
			</Button>
		</form>
	)
}
