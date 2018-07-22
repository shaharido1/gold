import { GraphQLSchema } from 'graphql';
import { missionQueries } from './resolvers/mission.query.resolvers';
import { missionMutations } from './resolvers/mission.mutation.resolvers';

export const missionSchema = new GraphQLSchema({
  query: missionQueries,
  mutation: missionMutations,
});
