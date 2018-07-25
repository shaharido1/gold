import { Mission, MissionInput, Missions } from './mission.typesDef';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { MissionService } from './mission.service';

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
        resolve: (root, { mission }) => this.missionService.addMission,
      },
    }),
  });


  public query = new GraphQLObjectType({
    name: 'missionsQueries',
    description: 'Root of mission query',
    fields: () => ({
      test: {
        type: GraphQLString,
        description: 'test graphQl',
        resolve: () => 'test graphQl ok'
      },
      missionTestQuery: {
        type: GraphQLString,
        description: 'test mission server',
        resolve: () => this.missionService.missionTestQuery()
      },
      getMission: {
        type: Mission,
        description: 'get one mission',
        resolve: () => this.missionService.getMission()
      },
      getAllMissions: {
        type: Missions,
        description: 'get all missions',
        resolve: () => this.missionService.getAllMissions()
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
        subscribe: this.missionService.missionSubscription,
      },
    }),
  });


  missionService : MissionService;

  constructor(missionService: MissionService) {
    this.missionService = missionService
  }
}