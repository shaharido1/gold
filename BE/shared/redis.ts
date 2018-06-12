import { appConfig } from '../consumer/src/config/appConfig';

import redis, { Multi, RedisClient } from 'redis';


export class Redis {

  multi;
  client: RedisClient;



  initConnection(): Promise<Multi> {
    return new Promise((resolve, reject) => {
      const tryToConnect = setInterval(() => {
        this.redisConnect()
            .then(() => {
              clearInterval(tryToConnect);
              this.multi = this.client.multi();
              return resolve(this.multi);
            })
            .catch(err => err);
      }, 2000);
    });
  }
  private redisConnect() {
    return new Promise((resolve, reject) => {
      this.client = redis.createClient({ host: 'redis' });
      this.client.on('ready', () => {
        return resolve()
      });
      this.client.on('error', (err)=> {
        console.log(err);
        return reject()
      })
    })
  }

  saveInRedisAndPublish(data) {
    const message = { key: `${appConfig.keyId}:${data.id}`, massage: data.massage };
    // console.log("writing to redis:" + message);
    this.multi
        .hmset(`${appConfig.keyId}:${data.id}`, 'massage', data.massage, (err, res) => {
          // console.log("redis:" + res);
          if (err) {
            console.error(err);
          }
        })
        .publish(appConfig.publishToEnrich, JSON.stringify(message))
        .exec();
  }
}
