//Users
export interface CreateUsernameData {
	createUsername: {
		success: boolean
		error: string
	}
}

export interface CreateUsernameVariables {
	username: string
}

export interface SerachUsersInput {
	username: string
}

export interface SearchUserData {
	searchUsers: Array<SearchedUser>
}

export interface SearchedUser {
	id: string
	username: string
}

//Conversation

export interface CreateConversationData {
	createConversation: {
		conversationId: string
	}
}

export interface CreateConversationInput {
	participantIds: Array<string>
}
