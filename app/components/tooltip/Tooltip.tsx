import { TextForTooltip } from './TextForTooltip'
import { FC, useEffect, useRef, useState } from 'react'
import ReactTooltip from 'react-tooltip'

import { TableOfWords } from '../TableOfWords/TableOfWords'

import s from './Tooltip.module.scss'

/*const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
	console.log(e)

	ReactTooltip.show(e.currentTarget)
}
		const hMouseOver = (e: React.MouseEvent<HTMLSpanElement>, i: number) => {
			//	setCurrentVal(ref.current[i]?.innerHTML)
			//						onMouseOver={(e) => hMouseOver(e, i)}
			//		ref={(el) => (ref.current[i] = el)}
		}

		/*	useEffect(() => {
		ref.current = ref.current.slice(0, text.split(' ').length)
	}, [text])

	const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
		setVal(ref.current[i]?.innerHTML)
	}*/

export const Tooltip: FC<{ text: string }> = ({ text }) => {
	const ref = useRef<Array<HTMLSpanElement | null>>([])
	const [list, setList] = useState<string[]>([])
	//const [isToolTipMounted, setIsToolTipMounted] = useState<boolean>(false)

	useEffect(() => {
		ReactTooltip.rebuild()
	})

	const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
		//setIsToolTipMounted(true)
	}
	const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
		//setIsToolTipMounted(false)
	}

	return (
		<>
			
			<ReactTooltip
				id="foo"
				type="error"
				isCapture={true}
				clickable={true}
				globalEventOff="click"
				multiline={true}
				getContent={(dataTip) => (
					<div className='flex-center-between'>
						<span>{dataTip?.toUpperCase()}</span> <br /> 
						<button className=' border rounded p-1 ml-5' onClick={() => setList([...list, dataTip])}>
							<b>Add +</b>
						</button>
					</div>
				)}
			/>

			<TextForTooltip text={text} />
			<br />
			<TableOfWords list={list} setList={setList} />
		</>
	)
}
