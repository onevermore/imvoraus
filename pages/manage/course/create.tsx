import { useMutation } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import { Heading } from '@/components/ui/heading/Heading'

import { ICourse } from '@/shared/types/create-course.types'

import { CoursesService } from '@/services/courses.service'

const CreateCourse: NextPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues,
	} = useForm<ICourse>({
		mode: 'onChange',
	})
	const { push } = useRouter()

	const create = useMutation({
		mutationFn: (courseData: ICourse) => {
			return CoursesService.createCourse(courseData)
		},
	})
	const onSubmit: SubmitHandler<ICourse> = async (e: ICourse) => {
		//	console.log('what is e == ', e)
		await create.mutateAsync(e)
		push('/courses')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
			<Heading title="Create new course" />
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
					{...register('level', {
						required: 'Level is required!',
					})}
					placeholder="Level"
					error={errors.level}
				/>
				<Field
					{...register('price', {
						required: 'Price is required!',
						max: 99,
					})}
					type="number"
					placeholder="Price"
					error={errors.price}
				/>
				<Field
					{...register('slug', {
						required: 'Slug is required!',
					})}
					placeholder="Slug"
					error={errors.slug}
				/>
			</div>
			<Button colored type="submit">
				Create
			</Button>
		</form>
	)
}

export default CreateCourse
