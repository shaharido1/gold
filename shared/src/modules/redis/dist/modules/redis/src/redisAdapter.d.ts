import { RedisClient } from 'redis';
import { RedisConfig } from '../../../interface/redisConfig';
export declare class RedisAdapter {
    config: RedisConfig;
    private multi;
    client: RedisClient;
    statusWorking: boolean;
    constructor(redisConfig?: RedisConfig);
    initClientConnection(): Promise<RedisClient>;
    private redisConnect;
    private createListeners;
    setMultiFieldsToMultival(redisKey: string, args: Array<string>): Promise<{}>;
    pushToSortedSet(redisKey: string, args: Array<string>): Promise<{}>;
    getRangeSetByScoreHighToLow(redisKey: string, min?: number | string, max?: number | string, withscores?: string, limit?: string, offset?: number, count?: number, passToResolve?: any): Promise<{}>;
    getAllFieldsAndValues(redisKey: string, passToResolve?: any): Promise<{}>;
    getValue(redisKey: string, subField: string[], passToResolve?: any): Promise<{}>;
    getAllFieldsHash(redisKey: string, passToResolve?: any): Promise<{}>;
    ttl(): void;
    execData(): Promise<any>;
    private resolveCb;
}
