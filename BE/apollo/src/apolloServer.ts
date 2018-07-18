import { schema } from './graphQl/schema';
import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer, Server } from 'http';
import { execute, subscribe, ValidationContext } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { GoldServer } from '../../shared/src/modules/goldServer/goldServer';
import { configFileLocation } from '../../consumer/config/config.filePath';
import * as core from 'express-serve-static-core';


export class ApolloServer extends GoldServer {

  validationRules: Array<(context: ValidationContext) => any> = [];
  private server : core.Express = express();
  private ws: Server;

  constructor() {
    super(configFileLocation);
    this.createServer();
    this.createWsServer();
  }

  createServer() {
    this.server.use('*', cors());
    const validationRules = this.validationRules;
    this.server.use('/graphql', bodyParser.json(), graphqlExpress({
      schema, debug: true, validationRules
    }));
    this.server.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${this.config.serverPort}/subscriptions`
    }));
  }

  createWsServer() {
    this.ws = createServer(this.server);
    const validationRules = this.validationRules;
    this.ws.listen(this.config.serverPort, () => {
      console.log(`Apollo Server is now running on http://localhost:${this.config.serverPort}`);
      new SubscriptionServer({
        execute,
        subscribe,
        validationRules,
        schema
      }, {
        server: this.ws,
        path: '/subscriptions'
      });
    });
  }

}