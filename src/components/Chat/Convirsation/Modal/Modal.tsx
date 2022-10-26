import { useLazyQuery } from '@apollo/client'
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
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import UserOperation from '../../../../graphql/operations/user'
import { SearchUserData, SerachUsersInput } from '../../../../utils/types'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
}

const ConversationModal: FC<ModalProps> = ({ isOpen, onClose }) => {
	const [username, setUsername] = useState('')
	const [searchUsers, { data, loading, error }] = useLazyQuery<
		SearchUserData,
		SerachUsersInput
	>(UserOperation.Queries.searchUsers)

	console.log('Here is a search Data', data)

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault()
		searchUsers({ variables: { username } })
		console.log('Inside on submit', username)
	}
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="#2d2d2d">
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
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ConversationModal
