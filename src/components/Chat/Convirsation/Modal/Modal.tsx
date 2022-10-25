import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react'
import { FC } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
}

const ConversationModal: FC<ModalProps> = ({isOpen, onClose}) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ConversationModal
