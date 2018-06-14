import { RedisAdapter } from './redis';
import { RedisClient } from 'redis';
import RSMQPromise from 'rsmq-promise';

export class RedisMqAdapter extends RedisAdapter {

  client: RedisClient;
  rsmq: RSMQPromise;
  private qname: string;
  private unDeletedMsg: Array<string> = [];

  initRMSQ(qname): Promise<RSMQPromise> {
    return new Promise((resolve, reject) => {
      this.initClientConnection()
          .then(client => {
            this.client = client;
            this.rsmq = new RSMQPromise(client);
            this.assertQueue(qname)
                .then(() => {
                  this.qname = qname;
                  return resolve(this.rsmq);
                });
          })
          .catch(err => {
            console.log(err);
            return reject(err);
          });
    });


  }


  private assertQueue(qname): Promise<void> {
    return new Promise((reoslve, reject) => {
      this.client.exists(`rsmq:${qname}:Q`, (err, res) => {
        if (res >= 1) {
          console.log(`Queue ${qname} already exist`);
          return reoslve();
        }
        else {
          this.rsmq.createQueue({ qname })
              .then(() => {
                console.log('Queue created!');
                return reoslve();
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

  reciveMessageNDo(workToDo: (message) => Promise<any>) {
    this.rsmq.receiveMessage({ qname: this.qname }).then((message) => {
      if (message && Object.keys(message).length) {
        workToDo(message).then(message => {
          this.rsmq.deleteMessage({ qname: this.qname, id: message.id }, (err, resp) => {
            if (resp === 1) {
              this.reciveMessageNDo(workToDo);
            }
            else {
              this.unDeletedMsg.push(message.id);
            }
          });
        });
      }
      else {
        console.log('no message');
        setTimeout(() => {
          this.reciveMessageNDo(workToDo);
        }, 200);
      }
    });
  }


}