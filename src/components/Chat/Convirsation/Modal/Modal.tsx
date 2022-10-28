import { useLazyQuery, useMutation } from '@apollo/client'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Stack,
	Input,
	Button,
	useToast,
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import UserOperation from '../../../../graphql/operations/user'
import ConversationOperation from '../../../../graphql/operations/conversation'
import {
	CreateConversationData,
	CreateConversationInput,
	SearchedUser,
	SearchUserData,
	SerachUsersInput,
} from '../../../../utils/types'
import Participants from './Participants'
import UserSerachList from './UserSerachList'
import { Session } from 'next-auth'

interface ModalProps {
	session: Session
	isOpen: boolean
	onClose: () => void
}

const ConversationModal: FC<ModalProps> = ({ session, isOpen, onClose }) => {
	const {user: {id: userId}} = session

	const [username, setUsername] = useState('')
	const [participants, setParticipants] = useState<Array<SearchedUser>>([])
	const toast = useToast()
	const [searchUsers, { data, loading, error }] = useLazyQuery<
		SearchUserData,
		SerachUsersInput
	>(UserOperation.Queries.searchUsers)
	const [createConversation, { loading: createConversationLoading }] =
		useMutation<CreateConversationData, CreateConversationInput>(
			ConversationOperation.Mutations.createConversation
		)

	const onCreateConversation = async () => {
		const participantIds = [userId, ...participants.map((p) => p.id)]
		try { 
			console.log('onCreateConversation fun', participantIds)
			const {data} = await createConversation({
				variables: {
					participantIds,
				},
			})
			console.log('Here is DATA', data);
		} catch (error) {
			console.log('onCreateConversation error', error)
			toast({
				title: `Error create conversation: ${error}`,
				status: 'error',
				duration: 4000,
				isClosable: true,
			})
		}
	}

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault()
		searchUsers({ variables: { username } })
		console.log('Inside on submit', username)
	}

	const addParticipent = (user: SearchedUser) => {
		setParticipants((prev) => [...prev, user])
		setUsername('')
	}

	const removeParticipant = (userId: string) => {
		setParticipants((prev) => prev.filter((p) => p.id !== userId))
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="#2d2d2d" pb={4}>
					<ModalHeader>Create a Conversation</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={onSearch}>
							<Stack spacing={4}>
								<Input
									placeholder="Enter a username"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
								<Button
									isLoading={loading}
									type="submit"
									disabled={!username}
								>
									Search
								</Button>
							</Stack>
						</form>
						{data?.searchUsers && (
							<UserSerachList
								users={data?.searchUsers}
								addParticipent={addParticipent}
							/>
						)}
						{participants.length !== 0 && (
							<>
								<Participants
									participants={participants}
									removeParticipant={removeParticipant}
								/>
								<Button
									bg="brand.100"
									width="100%"
									mt={6}
									_hover={{ bg: 'brand.100' }}
									onClick={onCreateConversation}
									isLoading={createConversationLoading}
								>
									Create Conversation
								</Button>
							</>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ConversationModal
