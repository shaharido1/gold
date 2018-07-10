import { createClient, Multi, RedisClient } from 'redis';
import { RedisConfig } from '../../interface/redisConfig';
import { redisDefaultConfig } from './redis.config.defalt';
import { RedisConnectionSetup, RedisListenEvents } from './model/redisListenEvents';


export class RedisAdapter {
  public config: RedisConfig;
  private multi: Multi;
  public client: RedisClient;
  statusWorking: boolean;

  constructor(redisConfig: RedisConfig) {
    this.config = redisConfig || redisDefaultConfig;
  }

  initClientConnection(): Promise<RedisClient> {
    return new Promise((resolve, reject) => {
      this.redisConnect().then();
      this.client.on(RedisListenEvents.READY, () => {

        this.multi = this.client.multi();
        console.log('redis is ready');
        return resolve(this.client);
      });
    });
  }


  private redisConnect() {
    return new Promise((resolve, reject) => {
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
      resolve();
    });

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


  sendToQueue(list: Array<{ id: string }>, key) {
    return new Promise((resolve, reject) => {
      list.forEach(data => {
        this.multi.hmset(`${key}:${data.id.toString()}`, RedisListenEvents.MESSAGE, JSON.stringify(data), (err, res) => {
          if (err) {
            console.error(err);
          }
        });
      });
      this.multi.exec((err, replies) => {
        if (replies) {
          return resolve(replies);
        }
        err ? console.log(err) : console.log('error with no error message');
        return reject(err);
      });

    });
  }

}