"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const resolvers_1 = require("./resolvers");
const graphql_tag_1 = require("graphql-tag");
const typeDefs = graphql_tag_1.default `
type Channel {
  id: ID!                # "!" denotes a required field
  name: String
  messages: [Message]!
}
input MessageInput{
  channelId: ID!
  text: String
}
type Message {
  id: ID!
  text: String
}
# This type specifies the entry points into our API
type Query {
  channels: [Channel]    # "[]" means this is a list of channels
  channel(id: ID!): Channel
}
# The mutation root type, used to define all mutations
type Mutation {
  addChannel(name: String!): Channel
  addMessage(message: MessageInput!): Message
}
# The subscription root type, specifying what we can subscribe to
type Subscription {
  messageAdded: String
}
`;
const schema = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers: resolvers_1.resolvers });
exports.schema = schema;
//# sourceMappingURL=schames.js.map