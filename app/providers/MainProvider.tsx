import AuthProvider from './AuthProvider/AuthProvider'
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

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import { store } from '@/store/store'

export const MainProvider: FC<TypeComponentAuthFields> = ({
	children,
	Component,
}) => {
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
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryParamProvider>
			</QueryClientProvider>
		</Provider>
	)
}
