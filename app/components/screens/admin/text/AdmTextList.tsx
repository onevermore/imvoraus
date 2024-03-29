import { AdmTextCard } from './AdmTextCard'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { Heading } from '@/components/ui/heading/Heading'
import { TextCard } from '@/components/ui/text-cards/TextCard2'

import { ITextDataFull } from '@/shared/types/text.types'

import { TextsService } from '@/services/texts.service'

import textImage from '@/assets/images/zod.webp'

export const AdmTextList = ({ list }: { list: ITextDataFull[] }) => {
	const router = useRouter()
	const { push } = router
	const { slug: courseSlug } = router.query
	const queryData = useQuery(['texts list'], () => TextsService.getAllTexts())

	return (
		<>
			<Heading title="Texts" className="py-8" />
			<div className="w-[80%] mx-auto grid md:grid-cols-2 xl:grid-cols-3  gap-5">
				{queryData.data?.texts?.map((myText: ITextDataFull, i: number) => (
					<div key={i}>
						<AdmTextCard
							imageURL={textImage.src}
							title={myText.title}
							slug={myText.slug}
							description={myText.description}
							text={myText.text}
							complexity={myText.complexity}
							_id={myText._id}
						/>
					</div>
				))}
			</div>
		</>
	)
}
