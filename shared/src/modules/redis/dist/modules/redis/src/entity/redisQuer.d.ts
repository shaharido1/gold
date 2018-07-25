export declare enum RedisInterceptionCoreFields {
    static = "static",
    dynamic = "dynamic",
    related_missions = "related_missions",
    rank = "rank",
    tags = "tags",
    byTime = "byTime",
    byRank = "byRank"
}
export declare enum RedisDataType {
    mission = "M",
    interception = "I",
    sensor = "S"
}
export interface RedisQuerySet {
    type: RedisDataType;
    entityId: string;
    mainFieldId?: RedisInterceptionCoreFields;
    entFields: Array<RedisInput>;
}
export interface RedisInput {
    subField: string;
    value: string;
}
export interface RedisQueryGetInterception {
    type: RedisDataType;
    entityId: string;
    missionId: string;
    static: StaticFields;
    dynamic?: boolean;
    related_missions?: boolean;
    rank: boolean;
    tags: boolean;
}
export interface StaticFields {
    name: boolean;
    surName: boolean;
    address: boolean;
}
export interface DynamicData {
    time: number;
    location: string;
}
export interface RedisQueryGetMission {
    type: RedisDataType;
    missionId: string;
    mainFieldId?: RedisInterceptionCoreFields;
}
