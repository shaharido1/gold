import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Position {
    x: String,
    y: String
}
type Message {
    id: String!
    message: String,
    position: Position,
    rank: Float,
    category: String
}
type Query {
  messages: [Message!]!
}
type Mutation {
  addMessage(message: String!): [String!]!
}
type Subscription {
  messageAdded: Message
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

