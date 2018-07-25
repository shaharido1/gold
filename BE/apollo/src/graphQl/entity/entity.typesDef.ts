import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const Entity  = new GraphQLObjectType({
  name: 'Entity',
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


export const CHANNEL_MISSION_ADDED = 'CHANNEL_MISSION_ADDED';

