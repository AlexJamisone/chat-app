import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { FC, useEffect } from 'react'
import ConversationList from './ConversationList'
import ConversationOperations from '../../../graphql/operations/conversation'
import { ConversationData } from '../../../utils/types'
import { ConversationPopulated } from '../../../../../backend/src/util/types'

interface ConversationWrapperProps {
	session: Session
}

const ConversationWrapper: FC<ConversationWrapperProps> = ({ session }) => {
	const {
		data: conversationData,
		error: conversationError,
		loading: conversationLoading,
		subscribeToMore,
	} = useQuery<ConversationData, null>(
		ConversationOperations.Queries.conversations
	)
	console.log(`Quary Data`, conversationData)
	const subsbcriptionToNewConversation = () => {
		subscribeToMore({
			document: ConversationOperations.Subscriptions.conversationCreated,
			updateQuery: (
				prev,
				{
					subscriptionData,
				}: {
					subscriptionData: {
						data: { conversationCreated: ConversationPopulated }
					}
				}
			) => {
				if (!subscriptionData.data) return prev
				console.log('Here is Subscription Data', subscriptionData)
				const newConversation =
					subscriptionData.data.conversationCreated
				return Object.assign({}, prev, {
					conversations: [newConversation, ...prev.conversations],
				})
			},
		})
	}

	useEffect(() => {
		subsbcriptionToNewConversation()
	}, [])
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
