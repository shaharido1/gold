import { GraphQLSchema } from 'graphql';
import { EntityService } from './entity.service';
import { EntityResolvers } from './entity.resolvers';
import { addMockFunctionsToSchema } from 'apollo-server';

export class EntitySchema {
  schema : GraphQLSchema;
  entityResolvers : EntityResolvers;
  pubSub;
  entityService;

  constructor(pubSub, isDev) {
    this.pubSub = pubSub;
    this.entityService = new EntityService(this.pubSub);
    this.entityResolvers = new EntityResolvers(this.entityService);
    const { query, subscription } = this.entityResolvers;
    this.schema = new GraphQLSchema({
      query,
      subscription
    });
    isDev? addMockFunctionsToSchema({schema: this.schema}) : null
  }
}
