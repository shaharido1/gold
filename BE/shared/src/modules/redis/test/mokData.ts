import { RedisDataType, RedisInterceptionCoreFields, RedisQuerySet } from '../entity/redisQuer';

export const entity1: Array<RedisQuerySet> = [
  {
    type: RedisDataType.interception,
    entityId: '1234577',
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'ohad' },
      { subField: 'surName', value: 'gefen' },
      { subField: 'address', value: '{City: "Tel-Aviv"}' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234577',
    mainFieldId: RedisInterceptionCoreFields.dynamic,
    entFields: [
      { subField: '1111111111', value: 'location1' },
      { subField: '2222222222', value: 'location2' },
      { subField: '3333333333', value: 'location3' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234577',
    mainFieldId: RedisInterceptionCoreFields.related_missions,
    entFields: [
      { subField: 'M_100', value: 'T' },
      { subField: 'M_105', value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234577',
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: 'M_100', value: '0.3' },
      { subField: 'M_105', value: '0.12' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234577',
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
    entityId: '1234578',
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'david' },
      { subField: 'surName', value: 'levi' },
      { subField: 'address', value: '{City: "London"}' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234578',
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
    entityId: '1234578',
    mainFieldId: RedisInterceptionCoreFields.related_missions,
    entFields: [
      { subField: 'M_101', value: 'T' },
      { subField: 'M_103', value: 'T' },
      { subField: 'M_105', value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234578',
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: 'M_101', value: '0.4' },
      { subField: 'M_103', value: '0.92' },
      { subField: 'M_105', value: '0.85' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234578',
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
    entityId: '1234579',
    mainFieldId: RedisInterceptionCoreFields.static,
    entFields: [
      { subField: 'name', value: 'ido' },
      { subField: 'surName', value: 'shahar' },
      { subField: 'address', value: '{City: "Tel-Aviv"}' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234579',
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
    entityId: '1234579',
    mainFieldId: RedisInterceptionCoreFields.related_missions,
    entFields: [
      { subField: 'M_100', value: 'T' },
      { subField: 'M_103', value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234579',
    mainFieldId: RedisInterceptionCoreFields.rank,
    entFields: [
      { subField: 'M_100', value: '0.5' },
      { subField: 'M_103', value: '0.95' }
    ]
  },
  {
    type: RedisDataType.interception,
    entityId: '1234579',
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
      { subField: '1', value: 'I_12345677' },
      { subField: '2', value: 'I_12345678' },
      { subField: '3', value: 'I_12345679' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '101',
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.3', value: 'I_12345677' },
      { subField: '0.4', value: 'I_12345678' },
      { subField: '0.5', value: 'I_12345679' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '102',
    mainFieldId: RedisInterceptionCoreFields.byTime,
    entFields: [
      { subField: '11', value: 'I_12345677' },
      { subField: '12', value: 'I_12345678' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '103',
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.92', value: 'I_12345677' },
      { subField: '0.95', value: 'I_12345678' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '104',
    mainFieldId: RedisInterceptionCoreFields.byTime,
    entFields: [
      { subField: '33', value: 'I_12345678' },
      { subField: '25', value: 'I_12345679' }
    ]
  },
  {
    type: RedisDataType.mission,
    missionId: '105',
    mainFieldId: RedisInterceptionCoreFields.byRank,
    entFields: [
      { subField: '0.12', value: 'I_12345677' },
      { subField: '0.85', value: 'I_12345678' }
    ]
  }
];


// Get one mission1 from redis with the top 10,000 score
export const oneMissionFromRedis = {
  missionQuery1: { type: RedisDataType.mission, missionId: '100', mainFieldId: RedisInterceptionCoreFields.byTime },
  min: 0,
  max: 10000,
  missionQueryAnswer1: [{ key: 'I_12345679', score: 3 }, { key: 'I_12345678', score: 2 }, { key: 'I_12345677', score: 1 }]

};

// Get entity from redis with all marked fields
export const oneEntityFromRedis = {
  queryOfEntity1: {
    type: RedisDataType.interception,
    entityId: '1234577',
    missionId: 'M_100',
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
    entityId: '1234577',
    missionId: 'M_100',
    static: {
      name: 'ohad',
      surName: 'gefen',
      address: '{City: "Tel-Aviv"}'
    },
    dynamic: { location1: '1111111111', location2: '2222222222', location3: '3333333333' },

    rank: ['0.3'],
    tags: ['[tag1,tag2,tag3]']
  }
};

// Get mission with all entities fields
export const MissinWithFielsd = {
  mission1: { type: RedisDataType.mission, missionId: '101', mainFieldId: RedisInterceptionCoreFields.byRank },
  min: 0,
  max: 10000

};