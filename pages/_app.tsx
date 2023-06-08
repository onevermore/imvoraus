import { DehydratedState } from '@tanstack/react-query'
import { Hydrate } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { MainProvider } from 'providers/MainProvider'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import '@/assets/styles/globals.scss'

type TypeAppProps = AppProps<{ dehydratedState: DehydratedState }> &
	TypeComponentAuthFields

function MyApp({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</MainProvider>
	)
}

export default MyApp
