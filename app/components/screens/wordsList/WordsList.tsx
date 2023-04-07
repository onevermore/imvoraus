import { FC, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { DekorHeading } from '@/components/ui/heading-decor/DekorHeading'

import { Meta } from '@/utils/meta/Meta'

import { Tooltip } from '../../tooltip/Tooltip'

export const WordsList: FC = () => {
	const [val, setVal] = useState('')

	const handleInput = (e: any) => {
		setVal(e.target.value)
	}
	console.count('render WordsList')
	return (
		<Meta
			title="Learn new words"
			description="Learn new words from your dictionary"
		>
			<DekorHeading text="Dictionary" className="text-center" />
			<h2>Click to add words to your dictionary: </h2>
			
		{/*	 <h2>Put your text here: </h2>
		<textarea
				className="resize block"
				value={val}
				onInput={handleInput}
			></textarea>
	<button className="rounded bg-primary p-3 mt-3">Add text</button>*/}
			<Tooltip
				title="Hello"
				text="Hallo mein Freund ! 
			Für das Wochenende und die Ferien mache ich gern Pläne. An den freien Samstagen und Sonntagen werde ich lange schlafen. Dann klingelt der Wecker nicht. Aber ich werde für die Wochenenden nicht zu viel planen, weil ich gern faul bin und nichts tue. Aber ich werde vielleicht zum Sport gehen. Manchmal habe ich am Wochenende ein Turnier. Diesen Sonntag zum Beispiel werde ich mit meinem Team in eine andere Stadt fahren. Wir werden dort ein Match gegen einen anderen Hockeyverein spielen. Das wird bestimmt ein Spaß. Wenn das Wetter schön ist, werde ich anschließend mit meinen Freunden schwimmen gehen. In der Nähe gibt es einen See, der wird schon warm genug sein.

			Wenn ich länger frei habe, mache ich gerne größere Pläne. In den Sommerferien werde ich sehr oft mit meinen Freunden unterwegs sein. Wir werden zum See fahren. Dort werden wir im Zelt übernachten und beim Lagerfeuer sitzen. Eine oder zwei Wochen möchte ich gerne reisen. Ein Freund wird mich auf der Reise begleiten, wir werden mit dem Zug losfahren. Wir planen eine Route durch das ganze Land, von West bis Ost und von Süd bis Nord. Mit Rucksäcken und Wanderschuhen werden wir auch in die Berge fahren. Am liebsten würde ich dort in einer Hütte übernachten. Wir werden sehen, ob wir das auch schaffen werden. Ein Abenteuer wird es aber ganz bestimmt.

"
			/>
		</Meta>
	)
}
