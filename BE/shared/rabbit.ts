import { Channel, Connection, connect } from 'amqplib/callback_api';
import { Replies } from 'amqplib/properties';
import { RabbitConfig } from './interfase/rabitConfig';


export class RabbitAdapter {

  config: RabbitConfig;
  private rabbitConnection: Connection;
  private rabbitChannel: Channel;

  constructor(rabbitConfig: RabbitConfig) {

    this.config = rabbitConfig || {
      config_rabbitHost: '10.0.75.1',
      config_rabbitPort: '5672',
      config_rabbitUser: 'guest',
      config_rabbitPassword: 'guest',
      config_rabbitQueueName: 'q',
      config_persistent: true
    };
    console.log(this.config);
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
      }, 10000);
    });
  }

  initConnection(): Promise<{ ok: Replies.AssertQueue, channel: Channel }> {
    return new Promise((resolve, reject) => {
      this.intervalConnection().then(() => {
        this.createChannel().then(() => {
          console.log(this.config);
          this.assertQueue(this.config.config_rabbitQueueName).then(ok => {
            return resolve({ ok: ok, channel: this.rabbitChannel });
          });
        });
      }).catch(() => reject('failed to connect'));
    });
  }

  public sendToQueue(message, queue = this.config.config_rabbitQueueName) {
    this.rabbitChannel.sendToQueue(queue, Buffer.from(message), { persistent: this.config.config_persistent });

  }

  private connect(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      console.log('trying to connect to ' + `amqp://${this.config.config_rabbitUser}:${this.config.config_rabbitPassword}@${this.config.config_rabbitHost}:${this.config.config_rabbitPort}`);
      connect(`amqp://${this.config.config_rabbitUser}:${this.config.config_rabbitPassword}@${this.config.config_rabbitHost}:${this.config.config_rabbitPort}`, (err, conn) => {
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


  public assertQueue(queue, options?): Promise<Replies.AssertQueue> {
    return new Promise((resolve, reject) => {
      this.rabbitChannel.assertQueue(queue, options, (err, ok) => {
        if (ok) {
          return resolve(ok);
        }
        else if (err) {
          console.log(err);
          return reject();
        }
      });
    });

  }


}