import { RedisAdapter } from './redisAdapter';
import { RedisConfig } from '../../../interface/redisConfig';
import { RedisDataType, RedisQueryGetInterception, RedisQueryGetMission, RedisQuerySet } from './entity/redisQuer';
export declare enum RedisGetTypes {
    set = "set",
    hashMap = "hashMap"
}
export declare enum RedisAnswerTypes {
    object = "object",
    missionId = "missionId",
    entityId = "entityId"
}
export declare enum GetRangeSorted {
    withscores = "withscores",
    limit = "limit",
    zero = 0,
    one = 1,
    tenThousand = 10000
}
export declare enum SizeOfBatch {
    size = 2
}
export declare type SomeFields = Map<string, {
    entityId: string;
    mainField: string;
    subFields: Array<string>;
    missionId?: string;
}>;
export declare type SetFields = Map<string, {
    entityId: string;
    mainField: string;
}>;
export declare class GoldDbService {
    redis: RedisAdapter;
    config: RedisConfig;
    mapSetFields: SetFields;
    mapHashFields: SomeFields;
    constructor();
    connectToDataBase(): Promise<{}>;
    writeBatchToRedis(batch: Array<RedisQuerySet>): Promise<any>;
    private writeEntityToRedis;
    private static redisInputIntoArrayString;
    private static fromRedisArrayToObject;
    private redisKeyBuilder;
    getDataFromBatchOfEntities(ArrayOfQueries: Array<RedisQueryGetInterception>): Promise<any>;
    getDataOfEntity(query: RedisQueryGetInterception): Promise<any>;
    getAllEntitiesOfSubFields(someFields?: SomeFields): Array<Promise<any>>;
    getTopRateFieldOfSet(setFields?: SetFields): Array<Promise<any>>;
    createObjectOfEntity(arr: Array<{
        argsToResolve: {
            redisKey: string;
            type: RedisGetTypes;
        };
        response: string;
    }>): {};
    createQuery(entityId: any, missionId: any, options?: any): {
        type: RedisDataType;
        entityId: any;
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
    getFieldsOfMission({ type, missionId, mainFieldId }: RedisQueryGetMission, max: any, min: any): Promise<{}>;
    getMission({ type, missionId, mainFieldId }: RedisQueryGetMission, max: any, min: any): Promise<{}>;
    getTopInRangeOfScore({ type, missionId, mainFieldId }: RedisQueryGetMission, max: number, min: number): Promise<{}>;
}
