import * as RSMQWorker from 'rsmq-worker';
import { EnrichConfig } from './model/EnrichConfig';
import { TimeSetup } from '../../shared/src/modules/measureTime/TimeSetup';
import { MeasureTime } from '../../shared/src/modules/measureTime/measeuerTime';
import { RedisAdapter2 } from '../../shared/src/modules/redis/src/redisAdapter';
export declare const DEV_ENVIRONMENT = "goldStarDevelopment";
export declare class Enrich {
    redis: RedisAdapter2;
    worker: RSMQWorker;
    config: EnrichConfig;
    timeSetup: TimeSetup;
    measureTime: MeasureTime;
    constructor();
    init(): void;
    getMessageFromRedis(): void;
    createNewList(msg: any): Array<any>;
}
