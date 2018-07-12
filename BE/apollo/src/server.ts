import Config from './config';
import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { schema } from './graphQl/schema';

const validationRules = [];
const server = express();
server.use('*', cors());

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema, debug: true, validationRules
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${Config.serverPort}/subscriptions`
}));

const ws = createServer(server);
ws.listen(Config.serverPort, () => {
  console.log(`Apollo Server is now running on http://localhost:${Config.serverPort}`);
  new SubscriptionServer({
    execute,
    subscribe,
    validationRules,
    schema
  }, {
    server: ws,
    path: '/subscriptions'
  });
});
