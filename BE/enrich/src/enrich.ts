import * as RSMQWorker from 'rsmq-worker';
import { RedisAdapter } from '../../shared/redis/redis';
import { ConfigHandler } from '../../shared/configSetup/configHandler';
import * as path from 'path';
import { EnrichConfig } from './model/EnrichConfig';
import { TimeSetup } from '../../shared/measureTime/TimeSetup';
import { MeasureTime } from '../../shared/measureTime/measeuerTime';
import { ConfigFileLocation } from '../config/config.enrich.default';
import { RedisMQWorkerAdapter } from '../../shared/redis/redisMQ-worker';

export const DEV_ENVIRONMENT = 'goldStarDevelopment';

export class Enrich {

  redis: RedisAdapter;
  worker: RSMQWorker;
  config: EnrichConfig;
  timeSetup: TimeSetup;
  measureTime: MeasureTime;

  constructor() {
    this.config = <EnrichConfig>new ConfigHandler(ConfigFileLocation).finalConfig;
    this.init();
  }

  init() {
    console.log(this.config)
    this.redis = new RedisAdapter(this.config.redisConfig);
    this.worker = new RedisMQWorkerAdapter(this.config.redisConfig.config_redisQueueName, this.config.redisConfig.config_redisHost);
    this.measureTime = new MeasureTime();

    this.timeSetup = {
      avgTime: 0,
      roundTime: 0,
      totalTime: 0,
      numberOfRounds: 0
    };

    this.redis.initClientConnection()
        .then(() => {
          this.getMessageFromRedis();
          this.worker.start();
        });
  }

  getMessageFromRedis() {

    const redisStartTime = new Date().getTime();
    console.log('enrich started');

    this.worker.on('message', (msg, next, id) => {
      const end = new Date().getTime();
      const parsedData = (JSON.parse(msg));
      if (redisStartTime > parsedData.start) {
        console.log('pass');
        next();
      }
      else {
        this.measureTime.showMeasureTime(end, parsedData.start, this.timeSetup, this.config);
        const newList = this.createNewList(parsedData.message);
        this.redis.sendToQueue(newList, this.config.config_keyId).then(() => {
          this.worker.del(id);
          next();
        });
      }
    });
  }

  createNewList(msg): Array<any> {
    const data = msg;
    const newList = [];
    data.forEach(x => {
      const newData = { ...x, status: 12 };
      newList.push(newData);
    });
    return newList;
  }

}