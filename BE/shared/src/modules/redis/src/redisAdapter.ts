import { createClient, Multi, RedisClient } from 'redis';
import { RedisConfig } from '../../../interface/redisConfig';
import { redisDefaultConfig } from './redis.config.defalt';
import { RedisConnectionSetup, RedisListenEvents } from './model/redisListenEvents';

export class RedisAdapter {
  public config: RedisConfig;
  private multi: Multi;
  public client: RedisClient;
  statusWorking: boolean;

  constructor(redisConfig: RedisConfig = redisDefaultConfig) {
    this.config = redisConfig;
  }

  initClientConnection(): Promise<RedisClient> {
    return new Promise((resolve, reject) => {
      this.redisConnect();
      this.client.on(RedisListenEvents.READY, () => {
        this.multi = this.client.multi();
        console.log('redis is ready');
        return resolve(this.client);
      });
    });
  }

  private redisConnect() {
    this.client = createClient({
      port: this.config.config_redisPort,
      host: this.config.config_redisHost,
      retry_strategy: (options) => {
        // console.log(options);
        if (options.error && options.error.code === RedisConnectionSetup.ECONNREFUSED) {
          console.log('connection refused');
        }
        if (options.total_retry_time > Number(RedisConnectionSetup.TOTAL_RETRY_TIMES)) {
          return new Error('Retry time exhausted');
        }

        return (Number(RedisConnectionSetup.RETRY_TIME));
      }
    });
    this.createListeners();
  }

  private createListeners() {
    this.client.on(RedisListenEvents.ERROR, (err) => {
      console.error(err);
    });
    this.client.on(RedisListenEvents.RECONNECTING, () => {
      console.log('Connection reestablished to redis');
    });
    this.client.on(RedisListenEvents.CONNECT, () => {
      console.log('redis is connecting');
    });
  }

  // set multiple hash fields to multiple values
  public setMultiFieldsToMultival(redisKey: string, args: Array<string>) {
    return new Promise((resolve, reject) => {
      this.multi.hmset(redisKey, args, (err, res) =>
          this.resolveCb(err, res, resolve, reject)
      );
    });
  }

  // add one or more members to a sorted set, or update its score if it already exists.
  public pushToSortedSet(redisKey: string, args: Array<string>) {
    return new Promise((resolve) => {
      this.multi.zadd(redisKey, args, (err, res) => {
        return resolve(res);
      });
    });
  }

  // Return a range of members in a sorted set, by score, with scores ordered from high to low.
  getRangeSetByScoreHighToLow(redisKey: string,
                              min: number | string = '+inf',
                              max: number | string = '-inf',
                              withscores?: string,
                              limit?: string,
                              offset?: number,
                              count?: number,
                              passToResolve?) {
    return new Promise((resolve, reject) => {
      this.multi.ZREVRANGEBYSCORE(redisKey, min, max, withscores, limit, offset, count, (err, res) => {
        return this.resolveCb(err, res, resolve, reject, passToResolve);
      });
    });
  }

  // get all fields and values in a hash
  getAllFieldsAndValues(redisKey: string, passToResolve?) {
    return new Promise((resolve, reject) => {
      this.multi.HGETALL(redisKey, (err, res) => {
        return this.resolveCb(err, res, resolve, reject, passToResolve);
      });
    });
  }

  // get the value of a hash mainFields
  getValue(redisKey: string, subField: string[], passToResolve?) {
    return new Promise((resolve, reject) => {
      this.multi.HMGET(redisKey, subField, (err, res) => {
        return this.resolveCb(err, res, resolve, reject, passToResolve);
      });
    });
  }

  // get all fields in hash
  getAllFieldsHash(redisKey: string, passToResolve?) {
    return new Promise((resolve, reject) => {
      this.multi.hkeys(redisKey, (err, res) => {
        return this.resolveCb(err, res, resolve, reject, passToResolve);
      });
    });
  }

  ttl() {
    // this.multi.EXPIRE()
  }

  execData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.multi.exec((err, res) => this.resolveCb(err, res, resolve, reject));
    });
  }

  private resolveCb(err, response, resolve, reject, argsToResolve?: any) {
    if (response) {
      const toResolve = argsToResolve ? { argsToResolve, response } : response;
      // console.log(toResolve)
      return resolve(toResolve);
    }
    else if (err) {
      console.log('err resolveCB');
      console.log(err);
      return reject(err);
    }
    else {
      console.log('error with no error message');

      return reject('error with no error message');
    }
  }

}