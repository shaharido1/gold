import { appConfig } from "./config/appConfig";

import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import { makeExecutableSchema } from 'graphql-tools';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';



const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});



const app = express();
const server = http.createServer(app);





app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.set("port", appConfig.port);

app.get('/test', (req, res) => res.send("okdasasdsdfsdfsdas "))

server.listen(appConfig.port, () => {

  console.log(`running fsdfsdon localhost:${appConfig.port}`);

});


module.exports = {
  server: server,
  app: app
};

