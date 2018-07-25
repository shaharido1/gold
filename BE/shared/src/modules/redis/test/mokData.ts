import { RedisDataType, RedisInterceptionCoreFields, RedisQuerySet } from '../src/entity/redisQuer';

const enum types {
  entity1Id = '1234577',
  entity2Id = '1234578',
  entity3Id = '1234579',
  mission1 = 'M_100',
  mission2 = 'M_101',
  mission3 = 'M_102',

}


export const entity1: Array<RedisQuerySet> = [
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'ohad' },
      { subField: 'surName', value: 'gefen' },
      { subField: 'address', value: '{City: "Tel-Aviv"}' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.dynamic,
    entFields: [
      { subField: '1111111111', value: 'location1' },
      { subField: '2222222222', value: 'location2' },
      { subField: '3333333333', value: 'location3' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.related_missions,
    entFields: [
      { subField: 'M_101', value: 'T' },
      { subField: 'M_105', value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: 'M_101', value: '0.3' },
      { subField: 'M_105', value: '0.12' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    mainFieldId: RedisInterceptionCoreFields.tags,
    entFields: [
      { subField: 'M_100', value: '[tag1,tag2,tag3]' },
      { subField: 'M_105', value: '[tag1,tag4]' }
    ]
  }
];


export const entity2: Array<RedisQuerySet> = [
  {
    type: RedisDataType.interception,
    entityId: types.entity2Id,
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'david' },
      { subField: 'surName', value: 'levi' },
      { subField: 'address', value: '{City: "London"}' }
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
      { subField: 'M_101', value: 'T' },
      { subField: 'M_103', value: 'T' },
      { subField: 'M_105', value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity2Id,
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: 'M_101', value: '0.4' },
      { subField: 'M_103', value: '0.92' },
      { subField: 'M_105', value: '0.85' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity2Id,
    mainFieldId: RedisInterceptionCoreFields.tags,
    entFields: [
      { subField: 'M_100', value: '[tag1,tag2,tag3]' },
      { subField: 'M_105', value: '[tag1,tag4]' }
    ]
  }
];

export const entity3: Array<RedisQuerySet> = [
  {
    type: RedisDataType.interception,
    entityId: types.entity3Id,
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'ido' },
      { subField: 'surName', value: 'shahar' },
      { subField: 'address', value: '{City: "Tel-Aviv"}' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity3Id,
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
    entityId: types.entity3Id,
    mainFieldId: RedisInterceptionCoreFields.related_missions,
    entFields: [
      { subField: 'M_101', value: 'T' },
      { subField: 'M_103', value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity3Id,
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: 'M_101', value: '0.5' },
      { subField: 'M_103', value: '0.95' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: types.entity3Id,
    mainFieldId: RedisInterceptionCoreFields.tags,
    entFields: [
      { subField: 'M_100', value: '[tag1,tag2,tag3]' },
      { subField: 'M_103', value: '[tag1,tag4]' }
    ]
  }
];

export const missions = [

  {
    type: RedisDataType.mission,
    missionId: '100',
    mainFieldId: RedisInterceptionCoreFields.byTime,
    entFields: [
      { subField: '1', value: 'I_1234577' },
      { subField: '2', value: 'I_1234578' },
      { subField: '3', value: 'I_1234579' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '101',
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.3', value: 'I_1234577' },
      { subField: '0.4', value: 'I_1234578' },
      { subField: '0.5', value: 'I_1234579' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '102',
    mainFieldId: RedisInterceptionCoreFields.byTime,
    entFields: [
      { subField: '11', value: 'I_1234577' },
      { subField: '12', value: 'I_1234578' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '103',
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.92', value: 'I_1234577' },
      { subField: '0.95', value: 'I_1234578' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '104',
    mainFieldId: RedisInterceptionCoreFields.byTime,
    entFields: [
      { subField: '33', value: 'I_1234578' },
      { subField: '25', value: 'I_1234579' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '105',
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.12', value: 'I_1234577' },
      { subField: '0.85', value: 'I_1234578' }
    ]
  }
];


// Get one mission1 from redis with the top 10,000 score
export const oneMissionFromRedis = {
  missionQuery1: { type: RedisDataType.mission, missionId: '100', mainFieldId: RedisInterceptionCoreFields.byTime },
  min: 0,
  max: 10000,
  missionQueryAnswer1: [{ key: 'I_1234579', score: 3 }, { key: 'I_1234578', score: 2 }, {
    key: 'I_1234577',
    score: 1
  }
  ]

};

// Get entity from redis with all marked fields
export const oneEntityFromRedis = {
  queryOfEntity1: {
    type: RedisDataType.interception,
    entityId: types.entity1Id,
    missionId: 'M_101',
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
    entityId: types.entity1Id,
    rank: ['0.3'],
    missionId: 'M_101',
    tags: [null],
    dynamic: [{ key: 'location3', score: 3333333333 }]
  }
};

// Get mission with all entities fields
export const MissinWithFielsd = {
  mission1: { type: RedisDataType.mission, missionId: '101', mainFieldId: RedisInterceptionCoreFields.byRank },
  min: 0,
  max: 10000

};