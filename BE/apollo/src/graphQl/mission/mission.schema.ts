import { missionMutations, missionQueries } from './mission.typesDef';
import { GraphQLSchema } from 'graphql';



export const missionSchema = new GraphQLSchema({
  query: missionQueries,
  mutation: missionMutations
});