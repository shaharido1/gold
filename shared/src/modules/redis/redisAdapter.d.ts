import { RedisClient } from 'redis';
import { RedisConfig } from '../../interface/redisConfig';
export declare class RedisAdapter {
    config: RedisConfig;
    private multi;
    client: RedisClient;
    statusWorking: boolean;
    constructor(redisConfig?: RedisConfig);
    initClientConnection(): Promise<RedisClient>;
    private redisConnect;
    createListeners(): void;
    setMultiFieldsToMultival(redisKey: string, args: any): Promise<{}>;
    getAllFieldsAndValues(redisKey: string): Promise<{}>;
    getValue(redisKey: string, subField: string): Promise<{}>;
    getAllFields(key: string): Promise<{}>;
    execData(): Promise<{}>;
    private resolveCb;
}
