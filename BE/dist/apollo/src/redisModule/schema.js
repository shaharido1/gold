"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const resolvers_1 = require("./resolvers");
const typeDefs = `
type Message {
    id: String!
    content: String
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
const schema = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers: resolvers_1.default });
exports.default = schema;
//# sourceMappingURL=schema.js.map