import { mockServer, gql } from 'apollo-server';

import { MissionSchema } from '../../../src/graphQl/mission/mission.schema';
import { mocks } from '../../../src/graphQl/mission/mission.mock';
import { assert, expect } from 'chai';

describe('test missions', () => {
  const missionSchema = new MissionSchema({}, true);
  let mockMissionServer = mockServer(missionSchema.schema, mocks);

  it('test mockServer is running', () => {
    return mockMissionServer.query(`{test}`)
        .then((res) => {
          expect(res.data.test).to.be.equal('Hello World');
        });
  });

  it('test get on missions', () => {
    return mockMissionServer.query(`{getMission{content, id}}`)
        .then((res) => {
          assertMission(res.data.getMission);
        });
  });

  it('test get list of missions', () => {
    return mockMissionServer.query(`{getAllMissions{content, id}}`)
        .then((res) => {
          expect(res.data.getAllMissions).to.be.an('array').that.is.not.empty;
          res.data.getAllMissions.forEach(mission => {
            assertMission(mission);
          });
        });
  });

  it('add missions', () => {
    return mockMissionServer.query(`{addMission(mission:{content: "content"}}`)
        .then((res) => {
          assert.isDefined(res);
        });
  });
});


function assertMission(mission) {
  expect(mission).to.have.property('content');
  expect(mission).to.have.property('id');
  expect(mission).to.be.string;
  expect(mission).to.be.string;
}