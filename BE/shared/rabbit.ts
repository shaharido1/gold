import amqp, { Channel, Connection } from 'amqplib/callback_api';
import { Observable } from 'rxjs/internal/Observable';
import { Replies } from 'amqplib/properties';

export interface rabbitAddress {
  port: string,
  host: string
}

export class Rabbit {
  private rabbitAddress: rabbitAddress;
  private rabbitConnection: Connection;
  private rabbitChannel: Channel;

  constructor(rabbitAddress?: rabbitAddress) {
    this.rabbitAddress = rabbitAddress || {
          host: process.env.rabbitHost,
          port: process.env.rabbitPort
        };
  }

  initConnection(queue) : Promise<{ok: Replies.AssertQueue, channel: Channel}> {
    return new Promise((resolve, reject) => {
      this.intervalConnection().then(() => {
        this.createChannel().then(() => {
          this.assertQueue(queue).then(ok =>{
            return resolve({ok: ok, channel: this.rabbitChannel})
          })
        })
      }).catch(() => reject("failed to connect"))
    })
  }

  private intervalConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      const tryToConnect = setInterval(() => {
        this.connect()
            .then((connection) => {
              clearInterval(tryToConnect);
              return resolve(connection);
            })
            .catch(err => err);
      }, 2000);
    });
  }

  private connect(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      console.log('trying to connect to ' + `amqp://guest:guest@${this.rabbitAddress.host}:${this.rabbitAddress.port}`);
      amqp.connect(`amqp://guest:guest@${this.rabbitAddress.host}:${this.rabbitAddress.port}`, (err, conn) => {
        if (conn) {
          console.log('connected to rabbit!');
          this.rabbitConnection = conn;
          return resolve(conn);
        }
        else if (err) {
          console.log('fail to connect');
          console.log(err);
          return reject();
        }
      });
    });
  }

  private createChannel(connection?): Promise<Channel> {
    return new Promise((resolve, reject) => {
      const conn = connection || this.rabbitConnection;
      conn.createChannel((err, channel) => {
        if (channel) {
          this.rabbitChannel = channel;
          return resolve(channel);
        }
        else if (err) {
          console.log('fail to connect');
          console.log(err);
          return reject();
        }
      });
    });
  }


  private assertQueue(queue, options?): Promise<Replies.AssertQueue> {
    return new Promise((resolve, reject) => {
      this.rabbitChannel.assertQueue(queue, options, (err, ok) => {
        if (ok) {
          return resolve(ok)
        }
        else if (err) {
          console.log(err);
          return reject();
        }
      })
    })

    }


}