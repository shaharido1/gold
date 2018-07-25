"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisQuer_1 = require("../src/entity/redisQuer");
exports.entity1 = [
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234577',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.static,
        entFields: [
            { subField: 'name', value: 'ohad' },
            { subField: 'surName', value: 'gefen' },
            { subField: 'address', value: '{City: "Tel-Aviv"}' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234577',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.dynamic,
        entFields: [
            { subField: '1111111111', value: 'location1' },
            { subField: '2222222222', value: 'location2' },
            { subField: '3333333333', value: 'location3' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234577',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.related_missions,
        entFields: [
            { subField: 'M_101', value: 'T' },
            { subField: 'M_105', value: 'T' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234577',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.rank,
        entFields: [
            { subField: 'M_101', value: '0.3' },
            { subField: 'M_105', value: '0.12' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234577',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.tags,
        entFields: [
            { subField: 'M_100', value: '[tag1,tag2,tag3]' },
            { subField: 'M_105', value: '[tag1,tag4]' }
        ]
    }
];
exports.entity2 = [
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234578',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.static,
        entFields: [
            { subField: 'name', value: 'david' },
            { subField: 'surName', value: 'levi' },
            { subField: 'address', value: '{City: "London"}' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234578',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.dynamic,
        entFields: [
            { subField: '1111111112', value: 'location1' },
            { subField: '2222222223', value: 'location2' },
            { subField: '3333333334', value: 'location3' },
            { subField: '4444444445', value: 'location4' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234578',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.related_missions,
        entFields: [
            { subField: 'M_101', value: 'T' },
            { subField: 'M_103', value: 'T' },
            { subField: 'M_105', value: 'T' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234578',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.rank,
        entFields: [
            { subField: 'M_101', value: '0.4' },
            { subField: 'M_103', value: '0.92' },
            { subField: 'M_105', value: '0.85' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234578',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.tags,
        entFields: [
            { subField: 'M_100', value: '[tag1,tag2,tag3]' },
            { subField: 'M_105', value: '[tag1,tag4]' }
        ]
    }
];
exports.entity3 = [
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234579',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.static,
        entFields: [
            { subField: 'name', value: 'ido' },
            { subField: 'surName', value: 'shahar' },
            { subField: 'address', value: '{City: "Tel-Aviv"}' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234579',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.dynamic,
        entFields: [
            { subField: '1111111112', value: 'location1' },
            { subField: '2222222223', value: 'location2' },
            { subField: '3333333334', value: 'location3' },
            { subField: '4444444445', value: 'location4' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234579',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.related_missions,
        entFields: [
            { subField: 'M_101', value: 'T' },
            { subField: 'M_103', value: 'T' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234579',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.rank,
        entFields: [
            { subField: 'M_101', value: '0.5' },
            { subField: 'M_103', value: '0.95' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234579',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.tags,
        entFields: [
            { subField: 'M_100', value: '[tag1,tag2,tag3]' },
            { subField: 'M_103', value: '[tag1,tag4]' }
        ]
    }
];
exports.missions = [
    {
        type: redisQuer_1.RedisDataType.mission,
        missionId: '100',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.byTime,
        entFields: [
            { subField: '1', value: 'I_1234577' },
            { subField: '2', value: 'I_1234578' },
            { subField: '3', value: 'I_1234579' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.mission,
        missionId: '101',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.byRank,
        entFields: [
            { subField: '0.3', value: 'I_1234577' },
            { subField: '0.4', value: 'I_1234578' },
            { subField: '0.5', value: 'I_1234579' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.mission,
        missionId: '102',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.byTime,
        entFields: [
            { subField: '11', value: 'I_1234577' },
            { subField: '12', value: 'I_1234578' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.mission,
        missionId: '103',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.byRank,
        entFields: [
            { subField: '0.92', value: 'I_1234577' },
            { subField: '0.95', value: 'I_1234578' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.mission,
        missionId: '104',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.byTime,
        entFields: [
            { subField: '33', value: 'I_1234578' },
            { subField: '25', value: 'I_1234579' }
        ]
    },
    {
        type: redisQuer_1.RedisDataType.mission,
        missionId: '105',
        mainFieldId: redisQuer_1.RedisInterceptionCoreFields.byRank,
        entFields: [
            { subField: '0.12', value: 'I_1234577' },
            { subField: '0.85', value: 'I_1234578' }
        ]
    }
];
// Get one mission1 from redis with the top 10,000 score
exports.oneMissionFromRedis = {
    missionQuery1: { type: redisQuer_1.RedisDataType.mission, missionId: '100', mainFieldId: redisQuer_1.RedisInterceptionCoreFields.byTime },
    min: 0,
    max: 10000,
    missionQueryAnswer1: [{ key: 'I_1234579', score: 3 }, { key: 'I_1234578', score: 2 }, {
            key: 'I_1234577',
            score: 1
        }
    ]
};
// Get entity from redis with all marked fields
exports.oneEntityFromRedis = {
    queryOfEntity1: {
        type: redisQuer_1.RedisDataType.interception,
        entityId: '1234577',
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
        entityId: '1234577',
        rank: ['0.3'],
        missionId: 'M_101',
        tags: [null],
        dynamic: [{ key: 'location3', score: 3333333333 }]
    }
};
// Get mission with all entities fields
exports.MissinWithFielsd = {
    mission1: { type: redisQuer_1.RedisDataType.mission, missionId: '101', mainFieldId: redisQuer_1.RedisInterceptionCoreFields.byRank },
    min: 0,
    max: 10000
};
//# sourceMappingURL=mokData.js.map