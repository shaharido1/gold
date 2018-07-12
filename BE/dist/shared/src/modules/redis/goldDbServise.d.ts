import { RedisEntity, RedisInterceptionQuery, RedisQueryCore, RedisQueryMissionRelated } from './model/dbInterface';
import { RedisAdapter } from './redisAdapter';
import { RedisConfig } from '../../interface/redisConfig';
export declare class GoldDbServise {
    redis: RedisAdapter;
    config: RedisConfig;
    constructor();
    connectToDataBase(): Promise<{}>;
    writeBatchToRedis(batch: Array<RedisEntity>): Promise<Array<string>>;
    private writeEntityToRedis;
    getAllEntityData(redisInterceptionQuery: RedisInterceptionQuery): void;
    getAllEntityFields({ type, entityId, coreFields }: RedisQueryCore): void;
    getAllEntitySubfields({ type, entityId, subField, missionRelatedFields }: RedisQueryMissionRelated): void;
    getAllSubKeys(key: any): Promise<{}>;
}
