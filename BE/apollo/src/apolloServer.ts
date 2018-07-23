import { GoldServer } from '../../../shared/src/modules/goldServer/goldServer';
import { ApolloServer } from 'apollo-server';
import { ServerInfo } from 'apollo-server/src/index';
import { configFileLocation } from '../config/apollo.config.filePath';
import { SchemaManager } from './graphQl/schema';

export class ApolloGoldServer extends GoldServer {

  private apolloServer: ApolloServer;
  schemaManager: SchemaManager;


  constructor() {
    super(configFileLocation);
    this.createServer();
  }


  private createServer() {
    this.schemaManager = new SchemaManager();
    this.apolloServer = new ApolloServer({ schema: this.schemaManager.schema, mocks: true});
    this.apolloServer.listen().then(({ url }: ServerInfo) => {
      console.log(`🚀  Server ready at ${url}`);
    });
}

}

