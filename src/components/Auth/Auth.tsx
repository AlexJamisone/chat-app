import { useState } from 'react'
import {
	Box,
	Button,
	Center,
	Image,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'

interface IAuthProps {
	session: Session | null
	reloadSession: () => void
}

const Auth: React.FunctionComponent<IAuthProps> = ({
	session,
	reloadSession,
}) => {
	const [username, setUsername] = useState('')

	const onSubmit = async () => {
		try {
			//CreateUsername Mutation to send our username to GraphQL API
		} catch (error) {
			console.log('onSubmit error', error)
		}
	}

	return (
		<Center height="100vh">
			<Stack align="center" spacing={5}>
				{session ? (
					<>
						<Text fontSize="3xl">Create a Username</Text>
						<Input
							placeholder="Enter a username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Button width="100%" onClick={onSubmit}>
							Save
						</Button>
					</>
				) : (
					<>
						<Text fontSize="3xl">Chat App</Text>
						<Button
							onClick={() => signIn('google')}
							leftIcon={
								<Image
									height="20px"
									src="/images/googlelogo.png"
									alt="google logo"
								/>
							}
						>
							Continium With Google
						</Button>
					</>
				)}
			</Stack>
		</Center>
	)
}

export default Auth
