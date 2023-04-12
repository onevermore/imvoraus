import { SkeletonLoader } from './SkeletonLoader'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const CourseSkeleton = ({ count }: { count: number }) => {
	return (
		<>
			{Array(count)
				.fill(0)
				.map((item, i) => (
					<div key={i} className="bg-gray-300 p-6 rounded-3xl">
						<div className="flex justify-start">
							<div>
								<SkeletonLoader height={25} width={60} />
							</div>
						</div>
						<div className="m-auto w-[90%]">
							<SkeletonLoader height={150} />
						</div>
						<div>
							<SkeletonLoader count={3} height={10} />
						</div>
						<div className="flex justify-start">
							<div>
								<SkeletonLoader height={30} width={50} />
							</div>
						</div>
					</div>
				))}{' '}
		</>
	)
}
