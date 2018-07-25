import { MockList } from 'apollo-server';
import casual from 'casual';

export const mocks = {
  Mission: () => ({
    content: casual.first_name,
    id: '\'sds'
  }),

  Missions: () => new MockList([3,10])
};