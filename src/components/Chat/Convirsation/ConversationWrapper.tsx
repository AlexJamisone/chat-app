import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { FC } from 'react'
import ConversationList from './ConversationList'
import ConversationOperations from '../../../graphql/operations/conversation'

interface ConversationWrapperProps {
	session: Session
}

const ConversationWrapper: FC<ConversationWrapperProps> = ({ session }) => {
	const {
		data: conversationData,
		error: conversationError,
		loading: conversationLoading,
	} = useQuery(ConversationOperations.Queries.conversations)
	console.log(`HERE IS DATA`, conversationData)
	return (
		<Box
			width={{ base: '100%', md: '400px' }}
			bg="whiteAlpha.50"
			py={6}
			px={3}
		>
			{/* Sceleton Loader */}
			<ConversationList session={session} />
		</Box>
	)
}

export default ConversationWrapper
