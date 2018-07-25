import { GoldServer } from '../../../shared/src/modules/goldServer/goldServer';
import { ApolloServer } from 'apollo-server';
import { ServerInfo } from 'apollo-server/src/index';
import { configFileLocation } from '../config/apollo.config.filePath';
import { SchemaManager } from './graphQl/schemaManager';
import { mocks } from './graphQl/mission/mission.mock';

export class ApolloGoldServer extends GoldServer {

  private apolloServer: ApolloServer;
  schemaManager: SchemaManager;


  constructor() {
    super(configFileLocation);
    this.schemaManager = new SchemaManager(true);
    this.createServerWithScheme(this.schemaManager.schema);
  }

  p

  public createServerWithScheme(schema) {
    this.apolloServer = new ApolloServer({ schema});
    this.apolloServer.listen(5222).then(({ url }: ServerInfo) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  }

}

