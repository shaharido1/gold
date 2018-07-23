import { MissionPaths } from '../../../../../shared/src/paths/mission.paths';
import { MissionServer } from '../../../../../shared/src/paths/servers.paths';
import { CHANNEL_MISSION_ADDED, Mission, MissionInput, Missions } from './mission.typesDef';
import axios from 'axios';
import { GraphQLObjectType, GraphQLString } from 'graphql';

export class MissionResolvers {


  public mutation = new GraphQLObjectType({
    name: 'MissionMutations',
    description: 'missions mutations',
    fields: () => ({
      addMission: {
        type: Mission,
        description: 'Create a new mission',
        args: {
          mission: { type: MissionInput },
        },
        resolve: (root, { mission }) => {
          return axios.post(MissionServer + MissionPaths.addMission, { mission }).then(res => {
            this.pubSub.publish(CHANNEL_MISSION_ADDED, res.data);
            console.log(res.data);
          });
        },

      },

    }),
  });


  public query = new GraphQLObjectType({
    name: 'missionsQueries',
    description: 'Root of mission query',
    fields: () => ({
      test: {
        type: GraphQLString,
        description: 'test mission server',
        resolve: () => 'test ok'
      },
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

  public subscription = new GraphQLObjectType({
    name: 'missionSubscription',
    description: 'Root of mission subscriptions',
    fields: () => ({
      missionSubscription: {
        type: GraphQLString,
        description: 'test subscritpion server',
        resolve: (data) => {console.log(data); return data;},
        subscribe: () => this.pubSub.asyncIterator(CHANNEL_MISSION_ADDED),
      },
    }),
  });


  pubSub;
  missionService;

  constructor(pubSub, missionService) {
    this.pubSub = pubSub;
    this.missionService = missionService
  }
}