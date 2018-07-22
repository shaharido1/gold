import { createClient, Multi, RedisClient } from 'redis';
import { RedisConfig } from '../../interface/redisConfig';
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

  createListeners() {
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
  setMultiFieldsToMultival(redisKey: string, args) {
    return new Promise((resolve, reject) => {
      this.multi.hmset(redisKey, ...args,
          (err, res) => {
            this.resolveCb(err, res, resolve, reject);
          });
    });
  }


  // get all fields and values in a hash
  getAllFieldsAndValues(redisKey: string) {
    return new Promise((resolve, reject) => {
      return this.client.HGETALL(redisKey, (err, res) => {
        this.resolveCb(err, res, resolve, reject);
      });
    });
  }

  // get the value of a hash mainField
  getValue(redisKey: string, subField: string) {
    return new Promise((resolve, reject) => {
      return this.multi.HGET(redisKey, subField, (err, res) => {
        this.resolveCb(err, res, resolve, reject);
      });
    });

  }

  // get all fields in hash
  getAllFields(key: string) {
    return new Promise((resolve, reject) => {
      return this.multi.HKEYS(key, (err, res: Array<string>) => {
        this.resolveCb(err, res, resolve, reject);
      });
    });

  }


  execData() {
    return new Promise((resolve, reject) => {
      this.multi.exec((err, res) => this.resolveCb(err, res, resolve, reject));
    });
  }

  private resolveCb(err, res, resolve, reject) {
    if (res) {
      console.log(res);
      return resolve(res);
    }
    else if (err) {
      return reject(err);
    }
    else {
      return reject('error with no error message');
    }
  }

}