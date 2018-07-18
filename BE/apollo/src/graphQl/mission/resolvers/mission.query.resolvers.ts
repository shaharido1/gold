import { GraphQLObjectType, GraphQLString } from 'graphql';
import axios from 'axios';
import { MissionServer } from '../../../../../shared/src/paths/servers.paths';
import { MissionPaths } from '../../../../../shared/src/paths/mission.paths';
import { Mission, Missions } from './mission.typesDef';


export const missionQueries = new GraphQLObjectType({
  name: 'missionsQueries',
  description: 'Root of mission query',
  fields: () => ({
    missionTestQuery: {
      type: GraphQLString,
      description: 'test mission server',
      resolve: () => axios.get(MissionServer + MissionPaths.test).then(res => res.data)
    },
    getAllMissions: {
      type: Missions,
      description: 'get all missions',
      resolve: () => axios.get(MissionServer + MissionPaths.getAllMission).then(res => res.data)
    },
    mission: {
      type: Mission,
      description: 'get one mission',
      resolve: () => axios.get(MissionServer + MissionPaths.getMissionById).then(res => res.data)
    }
  })
});
