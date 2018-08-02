import { GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { PubSub } from'graphql-subscriptions';


export const Mission  = new GraphQLObjectType({
  name: 'Mission',
  description: "mission type",
  fields: {
    content: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    }
  }
});

export const Missions = new GraphQLList(Mission);


export const  MissionInput = new GraphQLInputObjectType({
  name: 'missionInput',
  fields: {
    content: {
      type: GraphQLString
    }
  }
});

export const CHANNEL_MISSION_ADDED = 'CHANNEL_MISSION_ADDED';
export const pubSub = new PubSub();

