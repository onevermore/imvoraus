import Crossword from '@jaredreisinger/react-crossword'
import { ThemeProvider } from '@jaredreisinger/react-crossword'
import { axiosClassic } from 'api/interceptors'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { Heading } from '@/components/ui/heading/Heading'

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const crossSlug = context.params?.crossId

	let { data } = await axiosClassic.get(`/crosswords/by-slug/${crossSlug}`)

	return {
		props: {
			crossword: data,
		},
	}
}

const Text = ({ crossword }) => {
	const router = useRouter()

	/*const across = crossword.data.reduce((acc, val, i) => {
		if (val['direction'] === 'across') {
			acc[val]
		}
	}, {})
	*/
	//const across2 = crossword.map(cross => {

	const s = crossword.data.reduce(
		(acc, val, i) => {
			if (val['direction'] === 'across') {
				acc['across'][val.id] = {
					clue: val.clue,
					answer: val.answer,
					row: val.row,
					col: val.col,
				}
			}
			if (val['direction'] === 'down') {
				acc['down'][val.id] = {
					clue: val.clue,
					answer: val.answer,
					row: val.row,
					col: val.col,
				}
			}
			return acc
		},
		{ across: {}, down: {} }
	)
	//console.log('cross ---- ', s)

	//})
	//const cross = { across, down: {} }
	const themeContext = {
		columnBreakpoint: '500px',
		cellBackground: '#504d4dff',
		cellBorder: 'rgb(0,255,255)',
		textColor: 'rgb(255,255,255)',
		numberColor: 'rgba(255,255,255, 1)',
		focusBackground: 'rgb(0,155,255)',
		highlightBackground: '#c79bbe',
		gridBackground: 'transparent',
	}
	const onAllCorrect = () => {
		confirm('good job!')
	}

	return (
		<>
			<h1>{/*My Text number <b>{textId}</b> for Course: <b>{slug}</b>*/}</h1>
			<Heading title={crossword?.title} />
			<div className="my-5">{crossword.description}</div>
			<div className="sm:w-[40%] ml-[20%]">
				<ThemeProvider theme={themeContext}>
					<Crossword data={s} onCrosswordCorrect={onAllCorrect} />
				</ThemeProvider>
			</div>
		</>
	)
}

export default Text
