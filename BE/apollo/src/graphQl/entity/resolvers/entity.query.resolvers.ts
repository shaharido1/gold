import { GraphQLObjectType, GraphQLString } from 'graphql';
import axios from 'axios';
import { MissionServer } from '../../../../../../shared/src/paths/servers.paths';
import { MissionPaths } from '../../../../../../shared/src/paths/mission.paths';
import { Entities } from '../types/entity.typeDef';

export const entityQueries = new GraphQLObjectType({
  name: 'entityQueries',
  description: 'Root of entity query',
  fields: () => ({
    test: {
      type: GraphQLString,
      description: 'test entity query',
      resolve: () => 'test entity query ok',
    },
    getAllEntities: {
      type: Entities,
      description: 'get all entities',
      resolve: () => axios.get(MissionServer + MissionPaths.getAllMission).then(res => res.data),
    },
  }),
});
