import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { FC } from 'react'

import { Button } from '@/components/ui/form-elements/Button'

import { ITextData } from '@/shared/types/text.types'

export const AdmTextCard: FC<ITextData> = ({
	imageURL,
	title,
	slug,
	description,
	text,
	complexity,
	_id,
}) => {
	const router = useRouter()

	const { slug: courseSlug } = router.query

	/*p-[50px] grow-0 shrink-0 basis-[calc(100%/3)]    basis-full*/
	return (
		<div className="bg-teal-700/[.5]  rounded-3xl h-full ">
			<div className="p-10 w-11/12 m-auto flex flex-col min-h-full  ">
				<div className="font-bold">{title}</div>
				<div className="flex-auto w-full">
					<Image
						alt="image"
						src={imageURL}
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: '100%', height: '55%' }}
					/>
					<div>{description}</div>
					{/*<div className="">{text.slice(0, 40)}...</div>*/}
				</div>
				<div>{complexity}</div>
				<Button colored onClick={() => router.push(`/manage/text/edit/${_id}`)}>
					Edit
				</Button>
			</div>
		</div>
	)
}
