import { useUpload } from './useUpload'
import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { SkeletonLoader } from '../../SkeletonLoader'
import { IUploadField } from '../form.interface'
import s from '../form.module.scss'

const UploadField: FC<IUploadField> = ({
	placeholder,
	error,
	image,
	folder,
	onChange,
	isNoImage = false,
}) => {
	const { user } = useAuth()
	const { uploadImage, isLoading } = useUpload(onChange, folder, user)

	//const uploadImage = () => {}
	//console.log('image === ', image)
	return (
		<div className={cn(s.field, s.uploadField)} style={s}>
			<div className={s.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadImage} />
				</label>
				{!isNoImage && (
					<div className={s.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full" />
						) : (
							image && <Image src={image} alt="" layout="fill" unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
