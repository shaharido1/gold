import { GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { PubSub } from'graphql-subscriptions';

export const Entity  = new GraphQLObjectType({
  name: 'entity',
  description: 'entity type',
  fields: {
    content: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
    },
  },
});

export const Entities = new GraphQLList(Entity);

export const  EntityInput = new GraphQLInputObjectType({
  name: 'entityInput',
  fields: {
    content: {
      type: GraphQLString,
    },
  },
});


