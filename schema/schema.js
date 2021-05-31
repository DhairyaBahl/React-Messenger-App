# import User from './generated/prisma.graphql'
# import Conversation from './generated/prisma.graphql'
# import Text from './generated/prisma.graphql'
# import UserSubscriptionPayload from './generated/prisma.graphql'
# import TextSubscriptionPayload from './generated/prisma.graphql'

type Query {
  users: [User!]!
  me: User
}

type Mutation {
  signup(username: String!): AuthPayload!
  createConversation(
    name: String
    participantIds: [ID!]!
    text: String
  ): Conversation!
  sendTextMessage(conversationId: ID!, text: String!): Text!
}

type Subscription {
  user: UserSubscriptionPayload
  text: TextSubscriptionPayload
}

type AuthPayload {
  token: String
  user: User
}