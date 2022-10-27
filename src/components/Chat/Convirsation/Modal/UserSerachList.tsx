import { Avatar, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import user from '../../../../graphql/operations/user'
import { SearchedUser } from '../../../../utils/types'

interface UserSearchListProps {
	users: Array<SearchedUser>
	addParticipent: (user: SearchedUser) => void
}

const UserSerachList: FC<UserSearchListProps> = ({ users, addParticipent }) => {
	return (
		<>
			{users.length === 0 ? (
				<Flex mt={6} justify="center">
					<Text>No users found</Text>
				</Flex>
			) : (
				<Stack mt={6}>
					{users.map((user) => (
						<Stack
							direction="row"
							align="center"
							spacing={4}
							py={2}
							px={4}
							borderRadius={4}
							_hover={{ bg: 'whiteAlpha.200' }}
							key={user.id}
						>
							<Avatar />
							<Flex
								justify="space-between"
								width="100%"
								align="center"
							>
								<Text color="whiteAlpha.700">
									{user.username}
								</Text>
								<Button
									bg="brand.100"
									_hover={{ bg: 'brand.100' }}
									onClick={() => addParticipent(user)}
								>
									Select
								</Button>
							</Flex>
						</Stack>
					))}
				</Stack>
			)}
		</>
	)
}

export default UserSerachList
