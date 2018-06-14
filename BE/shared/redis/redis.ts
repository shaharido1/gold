import redis, { Multi, RedisClient } from 'redis';


export class RedisAdapter {

  multi: Multi;
  client: RedisClient;
  RedisAdapter: RedisAdapter;


  initClientConnection(): Promise<RedisClient> {
    return new Promise((resolve, reject) => {
      const tryToConnect = setInterval(() => {
        this.redisConnect()
            .then(() => {
              clearInterval(tryToConnect);
              this.multi = this.client.multi();
              return resolve(this.client);
            })
            .catch(err => err);
      }, 2000);
    });
  }


  private redisConnect() {
    return new Promise((resolve, reject) => {
      this.client = redis.createClient({ host: 'localhost' });
      // this.client = redis.createClient({ host: "redis" });
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