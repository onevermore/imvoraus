import { DehydratedState } from '@tanstack/react-query'
import { Hydrate } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { MainProvider } from 'providers/MainProvider'

import '@/assets/styles/globals.scss'

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ dehydratedState: DehydratedState }>) {
	return (
		<SessionProvider session={session}>
			<MainProvider>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</Hydrate>
			</MainProvider>
		</SessionProvider>
	)
}

export default MyApp
