
// The GraphQL schema in string form
import { makeExecutableSchema } from 'graphql-tools';
import { books } from './fakeData';

const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

