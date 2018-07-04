import Config from './config';
import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';
import bodyParser from 'body-parser';

import cors from 'cors';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

// schema file
import schema from './redisModule/schema';
import { MockPublisher } from './redisModule/redis.publisher';

// Express server
const server = express();



// origin must be same as your client URI

// endpoint for clients to interact with server
server.use('*', cors());
server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

// endpoint for browser client and test tool
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${Config.serverPort}/subscriptions`
}));

// IMPORTANT: wrap the Express server with new http client instance
const ws = createServer(server);
ws.listen(Config.serverPort, () => {
  console.log(`Apollo Server is now running on http://localhost:${Config.serverPort}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
