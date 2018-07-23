import { GraphQLSchema } from 'graphql';
import { MissionService } from './mission.service';
import { MissionResolvers } from './mission.resolvers';

export class MissionSchema {
  schema : GraphQLSchema;
  missionResolvers : MissionResolvers;
  pubSub;
  missionService;

  constructor(pubSub) {
    this.pubSub = pubSub;
    this.missionService = new MissionService();
    this.missionResolvers = new MissionResolvers(this.pubSub, this.missionService);
    const { query, mutation, subscription } = this.missionResolvers;
    this.schema = new GraphQLSchema({
      query,
      mutation,
      subscription
    });
  }
}
