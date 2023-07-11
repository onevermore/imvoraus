import { Button } from '../ui/form-elements/Button'

interface PlanCardProps {
	name: string
	description: string
	btnText?: string
	price?: string
	features: string[]
	color: string
}

export const PlanCard = ({
	name,
	description,
	price,
	features,
	color,
	btnText = 'Start Trial',
}: PlanCardProps) => {
	return (
		<div
			style={{ backgroundColor: color }}
			className="flex min-h-[428px] w-[320px] md:w-[400px] flex-col rounded-3xl p-8"
		>
			<h2 className="mb-5 text-xl font-medium rounded-md bg-primary/[0.8] max-w-min p-2">
				{name}
			</h2>
			<div className="mb-5 flex items-end text-6xl font-black">
				{price ? (
					<>
						<div>
							${price} <span className="text-2xl text-gray-600">/month</span>
						</div>
					</>
				) : (
					'Free'
				)}
			</div>
			<p className="mb-5">{description}</p>
			<ul className="mb-10 flex flex-col gap-y-2">
				{features.map((feature, id) => (
					<li key={id} className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mr-3 h-7 w-7"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1"
							/>
						</svg>
						{feature}
					</li>
				))}
			</ul>
			{name === 'Basic' ? (
				<p className="mt-auto text-center">Your current plan</p>
			) : (
				<Button colored className="mt-auto">
					{btnText}
				</Button>
			)}
		</div>
	)
}
