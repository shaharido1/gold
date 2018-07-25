import { GraphQLSchema } from 'graphql';
import { MissionService } from './mission.service';
import { MissionResolvers } from './mission.resolvers';
import { addMockFunctionsToSchema } from 'apollo-server';
import { mocks } from './mission.mock';

export class MissionSchema {
  schema : GraphQLSchema;
  missionResolvers : MissionResolvers;
  pubSub;
  missionService;

  constructor(pubSub, isDev) {
    this.pubSub = pubSub;
    this.missionService = new MissionService(this.pubSub);
    this.missionResolvers = new MissionResolvers(this.missionService);
    const { query, mutation, subscription } = this.missionResolvers;
    this.schema = new GraphQLSchema({
      query,
      mutation,
      subscription
    });
    isDev? addMockFunctionsToSchema({schema: this.schema, mocks, preserveResolvers: false}) : null;
  }
}
