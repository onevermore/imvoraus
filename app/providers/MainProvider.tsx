import { ReduxToast } from './ReduxToast'
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextAdapter } from 'next-query-params'
import { FC, PropsWithChildren, useState } from 'react'
import { Provider } from 'react-redux'
import { QueryParamProvider } from 'use-query-params'

import { Layout } from '@/components/layout/Layout'

import { store } from '@/store/store'

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	)
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<QueryParamProvider adapter={NextAdapter}>
					<ReduxToast />
					<Layout>{children}</Layout>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryParamProvider>
			</QueryClientProvider>
		</Provider>
	)
}
