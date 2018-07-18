import { GraphQLObjectType } from 'graphql';
import axios from 'axios';
import { MissionServer } from '../../../../../shared/src/paths/servers.paths';
import { MissionPaths } from '../../../../../shared/src/paths/mission.paths';
import { Mission } from './mission.typesDef';
import { MissionInput } from '../../../../../dist/apollo/src/graphQl/mission/mission.typesDef';

export const missionMutations = new GraphQLObjectType({
  name: 'MissionMutations',
  description: 'missions mutations',
  fields: () => ({
    addMission: {
      type: Mission,
      description: 'Create a new mission',
      args: {
        mission: { type: MissionInput }
      },
      resolve: (root, {mission}) => {
        return axios.post(MissionServer + MissionPaths.addMission, { mission}).then(res =>{
          console.log(res.data)
        })
      }
    },

  })
})
