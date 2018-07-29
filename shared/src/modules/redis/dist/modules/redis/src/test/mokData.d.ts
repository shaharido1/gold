import { RedisDataType, RedisInterceptionCoreFields, RedisQuerySet } from '../entity/redisQuer';
declare const enum types {
    entity0Id = "1234577",
    entity1Id = "1234578",
    entity2Id = "1234579",
    entity0 = "I_1234577",
    entity1 = "I_1234578",
    entity2 = "I_1234579",
    missionId0 = "100",
    missionId1 = "101",
    missionId2 = "102",
    mission0 = "M_100",
    mission1 = "M_101",
    mission2 = "M_102"
}
export declare const entity1: Array<RedisQuerySet>;
export declare const entity2: Array<RedisQuerySet>;
export declare const entity3: Array<RedisQuerySet>;
export declare const missions: {
    type: RedisDataType;
    missionId: types;
    mainFieldId: RedisInterceptionCoreFields;
    entFields: {
        subField: string;
        value: types;
    }[];
}[];
export declare const oneMissionFromRedis: {
    missionQuery1: {
        type: RedisDataType;
        missionId: types;
        mainFieldId: RedisInterceptionCoreFields;
    };
    min: number;
    max: number;
    missionQueryAnswer1: {
        key: types;
        score: number;
    }[];
};
export declare const oneEntityFromRedis: {
    queryOfEntity1: {
        type: RedisDataType;
        entityId: types;
        missionId: types;
        static: {
            name: boolean;
            surName: boolean;
            address: boolean;
        };
        dynamic: boolean;
        rank: boolean;
        tags: boolean;
    };
    queryOfEntity1Answer: {
        static: {
            name: string;
            surName: string;
            address: string;
        };
        entityId: string;
        rank: string[];
        missionId: string;
        tags: string[];
        dynamic: {
            key: string;
            score: number;
        }[];
    };
};
export declare const MissionWithFeels: {
    mission0: {
        type: RedisDataType;
        missionId: types;
        mainFieldId: RedisInterceptionCoreFields;
    };
    min: number;
    max: number;
};
export {};
