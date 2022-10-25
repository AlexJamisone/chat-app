import { useMutation } from '@apollo/client'
import { Button, Center, Image, Input, Stack, Text, useToast } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import UserOperations from '../../graphql/operations/user'
import { CreateUsernameData, CreateUsernameVariables } from '../../utils/types'

interface IAuthProps {
	session: Session | null
	reloadSession: () => void
}

const Auth: React.FunctionComponent<IAuthProps> = ({
	session,
	reloadSession,
}) => {
	const [username, setUsername] = useState('')
	const toast = useToast()

	const [createUsername, { loading, error }] = useMutation<
		CreateUsernameData,
		CreateUsernameVariables
	>(UserOperations.Mutations.createUsername)

	const onSubmit = async () => {
		if (!username) return
		try {
			const { data } = await createUsername({ variables: { username } })
			if (!data?.createUsername) {
				throw new Error()
			}
			if (data.createUsername.error) {
				const {
					createUsername: { error },
				} = data
				throw new Error(error)
			}
			//Reload Session to obtain new username
			toast({
				title: 'Username successfully created! 🚀',
				status: "success",
				duration: 5000,
				isClosable: true
			})
			reloadSession()
		} catch (error: any) {
			toast({
				title: `${error}`,
				status: 'error',
				duration: 5000,
				isClosable: true
			})
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
						<Button width="100%" onClick={onSubmit} isLoading={loading}>
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
