import { NextPage } from 'next'

const Info: NextPage = () => {
	return (
		<div>
			<h2 className="mb-8">Info Page</h2>
			<div>
				<p>
					<b>Imvoraus</b> is a courses platform, where you can improve your
					reading skills and learn new words.
				</p>
				<p>
					{' '}
					Imvoraus help you learn vocabulary with games and challenges such as
					crosswords, tests(Coming Soon) and etc.
				</p>
				<p>
					You can add words from texts with their translations to your own
					dictionary
				</p>
				<p>
					Also you can create your own mini-courses with different texts,
					crosswords and etc.
				</p>
			</div>
		</div>
	)
}

export default Info
