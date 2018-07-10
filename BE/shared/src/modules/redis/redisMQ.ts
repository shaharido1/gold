import { RedisAdapter } from './redis';
import * as RSMQPromise from 'rsmq-promise';
import { RedisClient } from 'redis';

export class RedisMqAdapter extends RedisAdapter {

  client: RedisClient;
  rsmq: RSMQPromise;

  // private unDeletedMsg: Array<string> = [];

  initRMSQ(): Promise<RSMQPromise> {
    return new Promise((resolve, reject) => {
      console.log('initRMSQ');
      this.initClientConnection()
          .then(client => {
            this.client = client;
            this.rsmq = new RSMQPromise({ client });
            this.assertQueue()
                .then(() => {
                  console.log('finished assert Q');
                  console.log(this.config.config_redisQueueName);
                  return resolve();
                });
          })
          .catch(err => {
            console.log(err);
            return reject(err);
          });
    });
  }


  private assertQueue(qname?): Promise<void> {
    if (qname !== undefined) {
      this.config.config_redisQueueName = qname;
    }

    return new Promise((resolve, reject) => {
      this.client.exists(`rsmq:${this.config.config_redisQueueName}:Q`, (err, res) => {
        if (res >= 1) {
          console.log(`Queue ${this.config.config_redisQueueName} already exist`);
          return resolve();
        }
        if (err) {
          console.error(err);
        }
        else {
          this.rsmq.createQueue({ qname: this.config.config_redisQueueName })
              .then(() => {
                console.log(`Queue ${this.config.config_redisQueueName} created!`);
                return resolve();
              })
              .catch(err => {
                if (err) {
                  console.error(err);
                  return reject();
                }
              });
        }

      });

    });
  }

  public sendMassage(message, qname = this.config.config_redisQueueName): Promise<any> {
    console.log((qname));
    return new Promise((resolve, reject) => {
      this.rsmq.sendMessage({ qname, message: JSON.stringify(message) }, (err, res) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        else if (res) {
          return resolve(res);
        }
        else {
          console.log('error with no error message');
          return reject();
        }
      });
    });
  }


}