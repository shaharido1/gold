import { RedisDataType, RedisInterceptionCoreFields, RedisQuerySet } from '../src/entity/redisQuer';

const enum types {
  entity0Id = '1234577',
  entity1Id = '1234578',
  entity2Id = '1234579',

  entity0 = 'I_1234577',
  entity1 = 'I_1234578',
  entity2 = 'I_1234579',

  missionId0 = '100',
  missionId1 = '101',
  missionId2 = '102',


  mission0 = 'M_100',
  mission1 = 'M_101',
  mission2 = 'M_102',

}


export const entity1: Array<RedisQuerySet> = [
  {
    type: RedisDataType.interception,
    entityId: types.entity0Id,
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'ohad' },
      { subField: 'surName', value: 'gefen' },
      { subField: 'address', value: '{City: "Tel-Aviv"}' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity0Id,
    mainFieldId: RedisInterceptionCoreFields.dynamic,
    entFields: [
      { subField: '1111111111', value: 'location1' },
      { subField: '2222222222', value: 'location2' },
      { subField: '3333333333', value: 'location3' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity0Id,
    mainFieldId: RedisInterceptionCoreFields.related_missions,
    entFields: [
      { subField: types.mission0, value: 'T' },
      { subField: types.mission1, value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity0Id,
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: types.mission0, value: '0.3' },
      { subField: types.mission1, value: '0.12' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity0Id,
    mainFieldId: RedisInterceptionCoreFields.tags,
    entFields: [
      { subField: types.mission0, value: '[tag1,tag2,tag3]' },
      { subField: types.mission1, value: '[tag1,tag4]' }
    ]
  }
];


export const entity2: Array<RedisQuerySet> = [
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'david' },
      { subField: 'surName', value: 'levi' },
      { subField: 'address', value: '{City: "London"}' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.dynamic,
    entFields: [
      { subField: '1111111112', value: 'location1' },
      { subField: '2222222223', value: 'location2' },
      { subField: '3333333334', value: 'location3' },
      { subField: '4444444445', value: 'location4' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.related_missions,
    entFields: [
      { subField: types.mission0, value: 'T' },
      { subField: types.mission1, value: 'T' },
      { subField: types.mission2, value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: types.mission0, value: '0.4' },
      { subField: types.mission1, value: '0.92' },
      { subField: types.mission2, value: '0.85' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.tags,
    entFields: [
      { subField: types.mission0, value: '[tag1,tag2,tag3]' },
      { subField: types.mission2, value: '[tag1,tag4]' }
    ]
  }
];

export const entity3: Array<RedisQuerySet> = [
  {
    type: RedisDataType.interception,
    entityId: types.entity2Id,
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'ido' },
      { subField: 'surName', value: 'shahar' },
      { subField: 'address', value: '{City: "Tel-Aviv"}' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity2Id,
    mainFieldId: RedisInterceptionCoreFields.dynamic,
    entFields: [
      { subField: '1111111112', value: 'location1' },
      { subField: '2222222223', value: 'location2' },
      { subField: '3333333334', value: 'location3' },
      { subField: '4444444445', value: 'location4' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity2Id,
    mainFieldId: RedisInterceptionCoreFields.related_missions,
    entFields: [
      { subField: types.mission0, value: 'T' },
      { subField: types.mission1, value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity2Id,
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: types.mission0, value: '0.5' },
      { subField: types.mission1, value: '0.95' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity2Id,
    mainFieldId: RedisInterceptionCoreFields.tags,
    entFields: [
      { subField: types.mission0, value: '[tag1,tag2,tag3]' },
      { subField: types.mission1, value: '[tag1,tag4]' }
    ]
  }
];

export const missions = [

  {
    type: RedisDataType.mission,
    missionId: types.missionId0,
    mainFieldId: RedisInterceptionCoreFields.byTime,
    entFields: [
      { subField: '1', value: types.entity0 },
      { subField: '2', value: types.entity1 },
      { subField: '3', value: types.entity2 }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: types.missionId0,
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.3', value: types.entity0 },
      { subField: '0.4', value: types.entity1 },
      { subField: '0.5', value: types.entity2 }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: types.missionId1,
    mainFieldId: RedisInterceptionCoreFields.byTime,
    entFields: [
      { subField: '11', value: types.entity0 },
      { subField: '12', value: types.entity1 }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: types.missionId1,
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.92', value: types.entity0 },
      { subField: '0.95', value: types.entity1 }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: types.missionId2,
    mainFieldId: RedisInterceptionCoreFields.byTime,
    entFields: [
      { subField: '33', value: types.entity1 },
      { subField: '25', value: types.entity2 }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: types.missionId2,
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.12', value: types.entity0 },
      { subField: '0.85', value: types.entity1 }
    ]
  }
];


// Get one mission0 from redis with the top 10,000 score
export const oneMissionFromRedis = {
  missionQuery1: {
    type: RedisDataType.mission,
    missionId: types.missionId0,
    mainFieldId: RedisInterceptionCoreFields.byTime
  },
  min: 0,
  max: 10000,
  missionQueryAnswer1: [{ key: types.entity2, score: 3 }, { key: types.entity1, score: 2 }, {
    key: types.entity0,
    score: 1
  }
  ]

};

// Get entity from redis with all marked fields
export const oneEntityFromRedis = {
  queryOfEntity1: {
    type: RedisDataType.interception,
    entityId: types.entity0Id,
    missionId: types.mission0,
    static: {
      name: true,
      surName: true,
      address: true
    },
    dynamic: true,
    rank: true,
    tags: true
  },
  queryOfEntity1Answer: {
    static: { name: 'ohad', surName: 'gefen', address: '{City: "Tel-Aviv"}' },
    entityId: '1234577',
    rank: ['0.3'],
    missionId: 'M_100',
    tags: ['[tag1,tag2,tag3]'],
    dynamic: [{ key: 'location3', score: 3333333333 }]
  }
};

// Get mission with all entities fields
export const MissionWithFeels = {
  mission0: {
    type: RedisDataType.mission,
    missionId: types.missionId0,
    mainFieldId: RedisInterceptionCoreFields.byRank
  },
  min: 0,
  max: 10000

};