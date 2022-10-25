import { Box, Text } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { FC, useState } from 'react'
import ConversationModal from './Modal/Modal'

type ConversationListPorps = {
	session: Session
}

const ConversationList: FC<ConversationListPorps> = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)
	return (
		<Box width="100%">
			<Box
				py={2}
				px={4}
				mb={4}
				bg="blackAlpha.300"
				borderRadius={4}
				cursor="pointer"
                onClick={onOpen}
			>
				<Text textAlign='center' color='whiteAlpha.800' fontWeight={500}>Find or start converstation</Text>
			</Box>
            <ConversationModal isOpen={isOpen} onClose={onClose}/>
		</Box>
	)
}

export default ConversationList
