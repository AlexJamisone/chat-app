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

interface ModalProps {
	isOpen: boolean
	onClose: () => void
}

const ConversationModal: FC<ModalProps> = ({ isOpen, onClose }) => {
	const [username, setUsername] = useState('')

	const onSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Inside on submit", username)
	}
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="#2d2d2d">
					<ModalHeader>Modal Title</ModalHeader>
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
								<Button type='submit' disabled={!username}>
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
