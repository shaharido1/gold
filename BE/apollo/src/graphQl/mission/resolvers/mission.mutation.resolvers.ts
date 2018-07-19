import { GraphQLObjectType } from 'graphql';
import axios from 'axios';
import { MissionServer } from '../../../../../shared/src/paths/servers.paths';
import { MissionPaths } from '../../../../../shared/src/paths/mission.paths';
import { CHANNEL_MISSION_ADDED, Mission, MissionInput, pubSub } from './mission.typesDef';

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
          pubSub.publish(CHANNEL_MISSION_ADDED, res.data);
          console.log(res.data)
        })
      }
    },

  })
})
