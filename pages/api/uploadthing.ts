import { ourFileRouter } from 'server/uploadthing'
import { createNextPageApiHandler } from 'uploadthing/server'

const handler = createNextPageApiHandler({
	router: ourFileRouter,
})

export default handler
