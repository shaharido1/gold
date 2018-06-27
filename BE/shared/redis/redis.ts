import redis, { Multi, RedisClient } from 'redis';
import { RedisConfig } from '../interfase/redisConfig';


export class RedisAdapter {
  config: RedisConfig;
  multi: Multi;
  client: RedisClient;
  redisAdapter: RedisAdapter;

  constructor(redisConfig: RedisConfig) {
    this.config = redisConfig || {
      config_redisHost: 'localhost',
      config_redisPort: 6379,
      config_redisQueueName: 'q'
    };
  }


  initClientConnection(redisEnv?): Promise<RedisClient> {
    return new Promise((resolve, reject) => {
      const tryToConnect = setInterval(() => {
        this.redisConnect(redisEnv)
            .then(() => {
              clearInterval(tryToConnect);
              this.multi = this.client.multi();
              console.log('redis Created');
              return resolve(this.client);
            })
            .catch(err => err);
      }, 2000);
    });
  }


  private redisConnect(redisEnv?) {
    redisEnv ? this.config.config_redisHost = redisEnv : this.config.config_redisHost;
    return new Promise((resolve, reject) => {
      this.client = redis.createClient({ host: this.config.config_redisHost });
      // this.client = redis.createClient({ host: 'redis' });
      this.client.on('ready', () => {
        return resolve();
      });
      this.client.on('error', (err) => {
        console.log(err);
        return reject();
      });
    });
  }


  saveInRedis(list, key) {
    return new Promise((resolve, reject) => {
      list.forEach(data => {
        // console.log(typeof data.id);
        this.multi.hmset(`${key}:${data.id.toString()}`, 'massage', JSON.stringify(data), (err, res) => {
          // console.log('redis:' + res);
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