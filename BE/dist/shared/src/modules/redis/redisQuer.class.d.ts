import { EntityQueryInterface, RedisQuerInterface } from './goldDbService';
import { RedisDataType } from './model/dbInterface';
export declare class RedisQuer {
    type: RedisDataType;
    entityId: string;
    missionId: string;
    entFields: EntityQueryInterface;
    constructor(redisQuer?: RedisQuerInterface);
    generateRandom(): void;
}
