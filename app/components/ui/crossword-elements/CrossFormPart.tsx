import cn from 'classnames'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

import { optionsDirection } from '@/components/screens/admin/select.data'

import { Button } from '../form-elements/Button'
import Field from '../form-elements/Field'

interface ICrossFormPart {
	index: number
	register: any
	remove: any
	errors: any
	control: any
}

export const CrossFormPart = ({
	index,
	register,
	remove,
	errors,
	control,
}: ICrossFormPart) => {
	const [isShow, setIsShow] = useState(true)

	const handleToggle = () => {
		setIsShow(!isShow)
	}

	return (
		<>
			<div className={cn({ 'mb-2': !isShow }, ' max-w-xl xl:max-w-full')}>
				<div
					className="relative cursor-pointer shadow-inner h-8 bg-primary rounded-t-lg "
					onClick={handleToggle}
				>
					<span className="absolute ml-2 mt-2 w-2 ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="h-5 w-5"
						>
							<path
								fillRule="evenodd"
								d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
								clipRule="evenodd"
							/>
						</svg>
					</span>
				</div>
				{isShow && (
					<div className=" xl:flex xl:justify-between xl:gap-4 w-full border-2 border-gray-300 rounded mb-2 p-4 text-md">
						<Field
							{...register(`data.${index}.id`, {
								required: 'No is required!',
								valueAsNumber: true,
							})}
							type="number"
							placeholder="No"
							className="h-8"
							error={errors.data?.[index]?.id}
							style={{ width: '80px' }}
						/>

						<Field
							{...register(`data.${index}.clue`, {
								required: 'Clue is required!',
							})}
							placeholder="Clue"
							error={errors?.data?.[index]?.clue}
							className="h-8"
							style={{ maxWidth: '300px' }}
						/>
						<Field
							{...register(`data.${index}.answer`, {
								required: 'Answer is required!',
							})}
							placeholder="Answer"
							error={errors.data?.[index]?.answer}
							className="h-8"
							style={{ width: '180px' }}
						/>

						<Controller
							control={control}
							name={`data.${index}.direction`}
							rules={{ required: true }}
							render={({ field: { onChange } }) => (
								<Select
									id="3"
									name="direction"
									className="w-48 flex items-center"
									options={optionsDirection}
									placeholder="Direction"
									onChange={(selectedOption: any) => {
										onChange(selectedOption.value)
									}}
								/>
							)}
						/>

						<Field
							{...register(`data.${index}.row`, {
								required: 'Row is required!',
								valueAsNumber: true,
							})}
							placeholder="Row"
							error={errors.data?.[index]?.row}
							type="number"
							className="h-8"
							style={{ width: '80px' }}
						/>
						<Field
							{...register(`data.${index}.col`, {
								required: 'Col is required!',
								valueAsNumber: true,
							})}
							type="number"
							placeholder="Column"
							error={errors.data?.[index]?.col}
							className="h-8"
							style={{ width: '80px' }}
						/>
						<div className="flex items-center">
							<Button rose onClick={() => remove(index)}>
								Remove
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

/*

<>
							<div className="container max-w-md">
								<div onClick={() => onToggleQuestion(index)} className="coloredtop h-6 bg-primary rounded-t-lg -mt-6"></div>
								<div
									key={field.id}
									className="w-full border-2 border-gray-300 rounded mb-2 p-4 text-md"
								>
									<Field
										{...register(`data.${index}.id`, {
											required: 'No is required!',
											valueAsNumber: true,
										})}
										type="number"
										placeholder="No"
										className="h-8"
										error={errors.data?.[index]?.id}
										style={{ width: '80px' }}
									/>

									<Field
										{...register(`data.${index}.clue`, {
											required: 'Clue is required!',
										})}
										placeholder="Clue"
										error={errors?.data?.[index]?.clue}
										className="h-8"
										style={{ width: '250px' }}
									/>
									<Field
										{...register(`data.${index}.answer` as const, {
											required: 'Answer is required!',
										})}
										placeholder="Answer"
										error={errors.data?.[index]?.answer}
										className="h-8"
										style={{ maxWidth: '250' }}
									/>
									<p>Direction</p>
									<Controller
										control={control}
										name={`data.${index}.direction`}
										render={({ field: { onChange } }) => (
											<Select
												id="3"
												name="direction"
												className="w-48"
												options={optionsDirection}
												placeholder="Select"
												onChange={(selectedOption: any) => {
													onChange(selectedOption.value)
												}}
											/>
										)}
									/>

									<Field
										{...register(`data.${index}.row`, {
											required: 'Row is required!',
											valueAsNumber: true,
										})}
										placeholder="Row"
										error={errors.data?.[index]?.row}
										type="number"
										className="h-8"
										style={{ width: '80px' }}
									/>
									<Field
										{...register(`data.${index}.col`, {
											required: 'Col is required!',
											valueAsNumber: true,
										})}
										type="number"
										placeholder="Col"
										error={errors.data?.[index]?.col}
										className="h-8"
										style={{ width: '80px' }}
									/>
									<div className="btn-box">
										{fields.length !== 1 && (
											<button
												className="mr10 bg-primary  rounded p-2 text-sm m-2"
												onClick={() => remove(index)}
											>
												Remove
											</button>
										)}
									</div>
								</div>
							</div>
						</>
*/
