import { useUsersCourses } from './useUsersCourses'
import { generateReactHelpers } from '@uploadthing/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { OurFileRouter } from 'server/uploadthing'

import AdmCoursesList from '@/components/ui/admin/AdmCoursesList'
import { Button } from '@/components/ui/form-elements/Button'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import { DekorHeading } from '@/components/ui/heading-decor/DekorHeading'
import { Heading } from '@/components/ui/heading/Heading'
import CoursesList from '@/components/ui/text-cards/CoursesList/CoursesList'

import { useAuth } from '@/hooks/useAuth'

import { getAdminUrl } from '@/config/url.config'

import { IUserState } from '@/store/user/user.interface'

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export const Profile: FC = () => {
	/*	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<{ avatar: string }>({
		mode: 'onChange',
	})
*/
	//	const { onSubmit, isLoading } = useAvatarEdit(setValue)

	const { user } = useAuth()

	const onSubmit = () => {}
	/*const { getRootProps, getInputProps, isDragActive, files, startUpload } =
		useUploadThing('imageUploader')*/

	const { usersCourses } = useUsersCourses(user?._id || '')
	const { push } = useRouter()

	if (!user) return <div>Loading...</div>

	return (
		<>
			<div>
				<Heading title="Profile" className="mb-10" />
				<div className="bg-primary/[0.4]  rounded-md p-16">
					<DekorHeading text="username" />
					<div>{'username1'}</div>
					<DekorHeading text="email" />
					<div>{'username@imvoraus.com'}</div>
				</div>
				<div className="mx-8 my-4">
					<div className="">
						<ul className="flex gap-8">
							<li>
								<Button rose onClick={() => push(getAdminUrl('course/create'))}>
									Create course
								</Button>
							</li>
							<li>
								{' '}
								<Button rose onClick={() => push('/dictionary')}>
									My Dictionary
								</Button>
							</li>
						</ul>
					</div>
				</div>
				<DekorHeading text="Courses I've Created" />
				<hr />
				{usersCourses.length !== 0 ? (
					<div className="md:max-w-[70%]">
						<AdmCoursesList full courses={usersCourses || []} />
					</div>
				) : (
					<div className=" mt-6">No courses yet...</div>
				)}

				{/*	<div
					{...getRootProps()}
					className="cursor-pointer bg-primary max-w-xs text-center rounded-md p-5 hover:bg-light-400"
				>
					<input {...getInputProps()} />
					<div>
						{files.length > 0 && (
							<Button onClick={() => startUpload()}>
								Upload {files.length} files
							</Button>
						)}
					</div>
					Drop files here!
						</div>*/}
			</div>
		</>
	)
}
