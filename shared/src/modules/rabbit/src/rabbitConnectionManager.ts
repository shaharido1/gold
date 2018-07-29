import { Channel, connect, Connection } from 'amqplib';
import { rabbitDefaultConfig } from './rabbit.config.default';
import { RabbitConfig } from '../../interface/rabitConfig';
import { retryPromise } from '../utils/utils';
import { RabbitConsumer } from './rabbitConsumer';
import { RabbitProducer } from './rabbitProducer';
import Bluebird = require('bluebird');

export enum CreatesType {
  PRODUCER = 'producer',
  CONSUMER = 'consumer'
}


export class RabbitConnectionManager {
  config: RabbitConfig;
  private rabbitConnection: Connection;
  private rabbitChannels: Array<Channel> = [];
  private workingOnConnection: boolean = false;
  private consumers: Array<RabbitConsumer> = [];
  private producers: Array<RabbitProducer> = [];

  constructor(rabbitConfig: RabbitConfig, connection?) {
    this.config = rabbitConfig || rabbitDefaultConfig;
    if (connection) {
      this.rabbitConnection = connection;
    }

  }

  private setUpListener() {
    this.rabbitConnection.on('error', () => {
      console.log('[rabbitConnection]: error');
      this.reconnect();
    });
    this.rabbitConnection.on('close', () => {
      console.log('[rabbitConnection]: connection closed');
      this.reconnect();
    });
    this.rabbitConnection.on('blocked', () => {
      console.log('[rabbitConnection]: connection blocked');
    });
    this.rabbitConnection.on('unblocked', () => {
      console.log('[rabbitConnection]: connection unblocked');
    });
  }

  public reconnect() {
    this.destroyConnection().then(() => {
      setTimeout(() => {
        console.log('[rabbitConnection]: trying to reconnect after an error');
        this.assertConnection().then(() => {
          [this.consumers, this.producers].forEach((arr: Array<RabbitProducer | RabbitConsumer>) => {
            arr.forEach((queueHandler) => {
              this.rabbitConnection.createChannel().then((channel) => (
                  queueHandler.recover(channel)
              ));
            });
          });
        });
      }, 1000);
    });

  }

  public spawnQueueWorker(isConsumerOrProducer: CreatesType): Promise<RabbitConsumer | RabbitProducer> {
    return new Promise((resolve, reject) => {
      this.assertConnection().then(() => {
        console.log('[rabbitConnection]: trying to create new channel');
        this.rabbitConnection.createChannel()
            .then((channel) => {
              console.log('[rabbitConnection]: new channel crated');
              let queueHandler;
              switch (isConsumerOrProducer) {
                case 'consumer':
                  queueHandler = new RabbitConsumer(this.config, channel);
                  this.consumers.push(queueHandler);
                  break;
                case 'producer':
                  queueHandler = new RabbitProducer(this.config, channel);
                  this.producers.push(queueHandler);
                  break;
              }
              return resolve(queueHandler);
            })
            .catch(err => {
              console.log('[rabbitConnection]: can\'t create channel due to err - ' + err);
              this.destroyConnection().then(() => {
                return this.spawnQueueWorker(isConsumerOrProducer);
              });
            });
      });
    });
  }

  public assertConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      if (this.rabbitConnection) {
        return resolve(this.rabbitConnection);
      }
      else if (this.workingOnConnection) {
        setTimeout(() => {
          return reject();
        }, 1000);
      }
      else {
        this.workingOnConnection = true;
        const { config_rabbitUser, config_rabbitPassword, config_rabbitHost, config_rabbitPort } = this.config;
        const connectionUrl = `amqp://${config_rabbitUser}:${config_rabbitPassword}@${config_rabbitHost}:${config_rabbitPort}`;
        console.log('[rabbitConnection]: trying to connect to ' + connectionUrl);
        retryPromise(() => <any>connect(connectionUrl), 5000)
            .then((connection: Connection) => {
              console.log('[rabbitConnection]: success creating connection');
              this.workingOnConnection = false;
              this.rabbitConnection = connection;
              this.setUpListener();
              return resolve(connection);
            })
            .catch(err => {
              return reject(err);
            });
      }
    });

  }

  private destroyConnection() {
    return new Promise((resolve, rejects) => {
      if (this.rabbitConnection) {
        this.rabbitConnection.close()
            .then(() => {
              this.clean();
              resolve();
            })
            .catch(err => {
              console.log('[rabbitConnection]: destroy Connection dont work');
              this.clean();
              resolve();

            });
      }
    });
  }

  clean() {
    this.rabbitConnection = undefined;
    this.rabbitChannels = [];
  }
}