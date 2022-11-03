import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { FC } from 'react'
import ConversationList from './ConversationList'
import ConversationOperations from '../../../graphql/operations/conversation'
import { ConversationData } from '../../../utils/types'

interface ConversationWrapperProps {
	session: Session
}

const ConversationWrapper: FC<ConversationWrapperProps> = ({ session }) => {
	const {
		data: conversationData,
		error: conversationError,
		loading: conversationLoading,
	} = useQuery<ConversationData, null>(
		ConversationOperations.Queries.conversations
	)
	console.log(`HERE IS DATA`, conversationData)
	return (
		<Box
			width={{ base: '100%', md: '400px' }}
			bg="whiteAlpha.50"
			py={6}
			px={3}
		>
			{/* Sceleton Loader */}
			<ConversationList
				session={session}
				conversations={conversationData?.conversations || []}
			/>
		</Box>
	)
}

export default ConversationWrapper
