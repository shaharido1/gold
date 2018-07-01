import { Channel, Connection, connect } from 'amqplib/callback_api';
import { Message, Replies } from 'amqplib/properties';
import { RabbitConfig } from '../interfase/rabitConfig';
import { rabbitDefaultConfig } from './rabbit.config.default';


export class RabbitAdapter {

  config: RabbitConfig;
  private rabbitConnection: Connection;
  private rabbitChannel: Channel;

  constructor(rabbitConfig: RabbitConfig) {
    this.config = rabbitConfig || rabbitDefaultConfig;
  }

  public initConnection(): Promise<{ ok: Replies.AssertQueue, channel: Channel }> {
    return new Promise((resolve, reject) => {
      this.intervalConnection().then(() => {
        this.createChannel().then(() => {
          this.assertQueue(this.config.config_rabbitQueueName).then(ok => {
            return resolve({ ok: ok, channel: this.rabbitChannel });
          });
        });
      }).catch(() => reject('failed to connect'));
    });
  }

  private intervalConnection(): Promise<Connection> {
    let i = 0;
    return new Promise((resolve, reject) => {
      const tryToConnect = setInterval(() => {
        this.connectToRabbitMQ()
            .then((connection) => {
              clearInterval(tryToConnect);
              return resolve(connection);
            })
            .catch(err => console.log('failed for the ' + i++ + 'time, due to ' + err));
      }, 10000);
    });
  }

  private connectToRabbitMQ(): Promise<Connection> {
    const {config_rabbitUser, config_rabbitPassword, config_rabbitHost, config_rabbitPort } = this.config;
    return new Promise((resolve, reject) => {
      console.log('trying to connect to ' + `amqp://${config_rabbitUser}:${config_rabbitPassword}@${config_rabbitHost}:${config_rabbitPort}`);
      connect(`amqp://${config_rabbitUser}:${config_rabbitPassword}@${config_rabbitHost}:${config_rabbitPort}`, (err, conn) => {
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

  public sendToQueue(message, queue = this.config.config_rabbitQueueName) {
    this.rabbitChannel.sendToQueue(queue, Buffer.from(message), { persistent: this.config.config_persistent });
  }

  public consumeFromQueue(queue = this.config.config_rabbitQueueName, options = this.config.config_queueOptions) : Promise<Message> {
    return new Promise ((resolve, reject) => {
        this.rabbitChannel.consume(queue, (msg: Message) => resolve(msg), options, (err : any, ok : Replies.Consume) => {
          if (err) {
            console.log(err);
            return reject(err)
          }
          else if (ok) {
            console.log("ok" + JSON.stringify(ok))
          }
        })

    })

  }

}