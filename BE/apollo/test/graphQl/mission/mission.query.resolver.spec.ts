import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import { schema } from '../../../src/graphQl/schema';
import graphqlTag from 'graphql-tag';

describe('sdf', () => {
  it('asdf', (done) => {

    addMockFunctionsToSchema({ schema, mocks: {}, preserveResolvers: true });
    const query = gql`
        query test
    `;

    graphql(schema, query).then(res => console.log(res));
    done();
  });
});
