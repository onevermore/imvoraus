import { PlanCard } from '@/components/screens/pricing/PlanCard'

import { Meta } from '@/utils/meta/Meta'

export const Pricing = () => {
	return (
		<Meta title="Plans & Pricing">
			<div className="flex flex-col items-center  p-4">
				<div className="mb-2 mt-12 text-center">
					<h1 className="mb-4 text-7xl ">Pricing</h1>
					<p className="text-lg ">Choose the right plan for your needs:</p>
				</div>
				<div className="flex flex-col gap-8 p-10 xl:flex-row ">
					<PlanCard
						color="#65c1bf"
						name="Basic"
						description="Get started with the basic plan"
						features={[
							'Add 20 words per day',
							'Create 2 public courses',
							'Learn German',
						]}
						btnText="Start Free plan"
					/>

					<PlanCard
						color="#7ce9e7"
						name="Pro"
						price="5"
						description="Choose Pro plan"
						features={[
							'Add unlimited quantity of words a day',
							'Create unlimited courses',
							'Make your courses private',
							'Learn German',
						]}
						btnText="I want it!"
					/>
				</div>
			</div>
		</Meta>
	)
}
