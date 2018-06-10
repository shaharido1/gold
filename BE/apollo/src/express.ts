import { makeExecutableSchema } from 'graphql-tools';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';

import express from 'express';
// Some fake data
import cors from 'cors';
import * as http from 'http';
//
// const books = [
//   {
//     title: "Harry Potter and the Sorcerer's stone",
//     author: 'J.K. Rowling',
//   },
//   {
//     title: 'Jurassic Park',
//     author: 'Michael Crichton',
//   },
// ];
//
// // The GraphQL schema in string form
// const typeDefs = `
//   type Query { books: [Book] }
//   type Book { title: String, author: String }
// `;
//
// // The resolvers
// const resolvers = {
//   Query: { books: () => books },
// };
//
// // Put together a schema
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });
//
// // Initialize the app
const app = express();
// cors({origin: "http://localhost:4200"});// The GraphQL endpoint
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
//
// // GraphiQL, a visual editor for queries
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.get('/publisher', (req, res) => res.send('hello'));
const server = http.createServer(app);
const port = '6000';

server.listen(port, () => {
  console.log(`running on localhost:${port}`)
});
