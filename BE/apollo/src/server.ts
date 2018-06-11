import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { appConfig } from './config/appConfig';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// const pubsub = new RedisPubSub();
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { booksSchema } from './graphqlStuff';


const app = express();
app.use('*', cors());
app.use(morgan('dev'));
app.use('/graphql', cors(), bodyParser.json({ limit: '10mb' }), graphqlExpress({ schema: booksSchema }));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost${appConfig.port}/subscriptions`
}));
app.get('/test', (req, res) => res.send('apollo server up and running'));
const server = createServer(app);


server.listen(appConfig.port, () => {
  console.log('apollo server running on port' + appConfig.port);


});

module.exports = {
  app: app
};

