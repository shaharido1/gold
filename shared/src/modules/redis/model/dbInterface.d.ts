export interface RedisEntity {
    type: RedisDataType;
    entityId: string;
    mainField?: string;
    redisInput: Array<RedisInput>;
}
export interface RedisInput {
    value: string;
    subField: string;
}
export declare enum RedisDataType {
    mission = "M",
    interception = "I",
    sensor = "S"
}
export declare type RedisInterCeptionFiedls = RedisInterceptionCoreFields | RedisInterceptionMissionRelatedFields;
export declare type RedisInterceptionQuery = RedisQueryMissionRelated | RedisQueryCore;
export interface RedisQueryMissionRelated extends RedisQuery {
    missionRelatedFields: Array<RedisInterceptionMissionRelatedFields>;
    subField: string;
}
export interface RedisQueryCore extends RedisQuery {
    coreFields: Array<RedisInterceptionCoreFields>;
}
export interface RedisQuery {
    type: RedisDataType;
    entityId: string;
}
export declare enum RedisInterceptionCoreFields {
    static = "static",
    dynamic = "dynamic"
}
export declare enum RedisInterceptionMissionRelatedFields {
    related_missions = "related_missions",
    rank = "rank",
    tags = "tags"
}
export interface RedisInterCeptionEntity {
    coreFields: RedisInterceptionCoreFields;
    missionRelatedFields: RedisInterceptionMissionRelatedFields;
}
