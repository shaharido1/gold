import { RedisAdapter2 } from './redisAdapter';
import * as RSMQPromise from 'rsmq-promise';
import { RedisClient } from 'redis';
export declare class RedisMqAdapter extends RedisAdapter2 {
    client: RedisClient;
    rsmq: RSMQPromise;
    initRMSQ(): Promise<RSMQPromise>;
    private assertQueue;
    sendMassage(message: any, qname?: any): Promise<any>;
}
