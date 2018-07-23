import { GraphQLObjectType, GraphQLString } from 'graphql';

import { CHANNEL_MISSION_ADDED } from '../types/mission.typesDef';
import { pubSub } from '../../../apolloServer';

export const missionQueries = new GraphQLObjectType({
  name: 'missionSubscription',
  description: 'Root of mission subscriptions',
  fields: () => ({
    missionSubscription: {
      type: GraphQLString,
      description: 'test subscritpion server',
      resolve: (data) => {console.log(data); return data;},
      subscribe: () => pubSub.asyncIterator(CHANNEL_MISSION_ADDED),
    },
  }),
});
