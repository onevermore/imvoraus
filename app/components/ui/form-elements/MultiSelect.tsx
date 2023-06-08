import CreatableReactSelect from 'react-select/creatable'

interface INewValue {
	id: string
	label: string
}

export interface IMultiSelect {
	value: INewValue[]
	setValue: React.Dispatch<React.SetStateAction<INewValue[]>>
	title: string
}

export const MultiSelect = ({ value, setValue, title }: IMultiSelect) => {
	return (
		<div className="pt-8">
			<div className="pb-4">{title}:</div>
			<CreatableReactSelect
				onCreateOption={(label) => {
					const newStudent: INewValue = { id: String(Date.now()), label }
					setValue((prev: INewValue[]) => [...prev, newStudent])
				}}
				value={value.map((val) => {
					return {
						label: val.label,
						value: val.id,
					}
				})}
				onChange={(vals) => {
					setValue(
						vals.map((val) => {
							return {
								label: val.label,
								id: val.value,
							}
						})
					)
				}}
				isMulti
				className="w-full"
			/>
		</div>
	)
}
