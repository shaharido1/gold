import { RedisDataType, RedisInterceptionCoreFields, RedisQuerySet } from '../src/entity/redisQuer';
declare const enum types {
    entity1Id = "1234577",
    entity2Id = "1234578",
    entity3Id = "1234579",
    mission1 = "M_100",
    mission2 = "M_101",
    mission3 = "M_102"
}
export declare const entity1: Array<RedisQuerySet>;
export declare const entity2: Array<RedisQuerySet>;
export declare const entity3: Array<RedisQuerySet>;
export declare const missions: {
    type: RedisDataType;
    missionId: string;
    mainFieldId: RedisInterceptionCoreFields;
    entFields: {
        subField: string;
        value: string;
    }[];
}[];
export declare const oneMissionFromRedis: {
    missionQuery1: {
        type: RedisDataType;
        missionId: string;
        mainFieldId: RedisInterceptionCoreFields;
    };
    min: number;
    max: number;
    missionQueryAnswer1: {
        key: string;
        score: number;
    }[];
};
export declare const oneEntityFromRedis: {
    queryOfEntity1: {
        type: RedisDataType;
        entityId: types;
        missionId: string;
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
        entityId: types;
        rank: string[];
        missionId: string;
        tags: any[];
        dynamic: {
            key: string;
            score: number;
        }[];
    };
};
export declare const MissinWithFielsd: {
    mission1: {
        type: RedisDataType;
        missionId: string;
        mainFieldId: RedisInterceptionCoreFields;
    };
    min: number;
    max: number;
};
export {};
