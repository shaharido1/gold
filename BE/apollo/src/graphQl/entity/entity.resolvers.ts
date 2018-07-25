import { GraphQLObjectType, GraphQLString } from 'graphql';
import { Entities, Entity } from './entity.typesDef';
import { EntityService } from './entity.service';

export class EntityResolvers {


  public query = new GraphQLObjectType({
    name: 'missionsQueries',
    description: 'Root of mission query',
    fields: () => ({
      test: {
        type: GraphQLString,
        description: 'test graphQl',
        resolve: () => 'test graphQl ok'
      },
      getAll: {
        type: Entities,
        description: 'get all entites',
        resolve: () => this.entityService.getAll()
      }
    })
  });

  public subscription = new GraphQLObjectType({
    name: 'entitySub',
    description: 'Root of entity subscriptions',
    fields: () => ({
      entitySub: {
        type: Entity,
        description: 'test subscritpion server',
        resolve: (data) => data,
        subscribe: () => this.entityService.entitySub()
      },
    }),
  });


  entityService : EntityService;

  constructor(entityService  : EntityService) {
    this.entityService = entityService
  }
}