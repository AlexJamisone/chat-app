import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../chakra/theme'
import { ApolloProvider } from '@apollo/client'
import { client } from '../graphql/apollo-client'

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={pageProps.session}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</SessionProvider>
		</ApolloProvider>
	)
}

export default MyApp
