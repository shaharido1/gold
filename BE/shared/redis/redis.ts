import { createClient, Multi, RedisClient } from 'redis';
import { RedisConfig } from '../interfase/redisConfig';
import { redisDefaultConfig } from './redis.config.defalt';
import { RedisListenEvents } from './model/redisListenEvents';


export class RedisAdapter {
  public config: RedisConfig;
  private multi: Multi;
  public client: RedisClient;

  constructor(redisConfig: RedisConfig) {
    this.config = redisConfig || redisDefaultConfig;
    // todo chane error listener
    // this.setErrorListener();
  }

  initClientConnection(): Promise<RedisClient> {
    return new Promise((resolve, reject) => {
      const tryToConnect = setInterval(() => {
        this.redisConnect()
            .then(() => {
              clearInterval(tryToConnect);
              this.multi = this.client.multi();
              console.log('redis Created');
              return resolve(this.client);
            })
            .catch(err => err);
      }, this.config.reconnect);
    });
  }

  setErrorListener() {
    this.client.on(RedisListenEvents.ERROR, (err) => {
      console.log(err);
    });
  }


  private redisConnect() {
    return new Promise((resolve, reject) => {
      this.client = createClient({
        port: this.config.config_redisPort,
        host: this.config.config_redisHost,
        retry_strategy: (options) => {
          if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
          }
          if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
          }
          // reconnect after
          return (3000);
        }
      });
      this.client.on(RedisListenEvents.READY, () => {
        return resolve();
      });

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