import { Channel, connect, Connection } from 'amqplib';
import { rabbitDefaultConfig } from './rabbit.config.default';
import { RabbitConfig } from '../interfase/rabitConfig';
import { retryPromise } from '../utils/utils';


export class RabbitConnectionManager {
  config: RabbitConfig;
  private rabbitConnection: Connection;
  private rabbitChannels: Array<Channel> = [];
  private workingOnConnection: boolean = false;

  constructor(rabbitConfig: RabbitConfig, connection) {
    this.config = rabbitConfig || rabbitDefaultConfig;
    if (connection) {
      this.rabbitConnection = connection;
    }
  }

  private setUpListener() {
    this.rabbitConnection.on('error', () => {
      this.rabbitConnection = undefined;
      setTimeout(() => {
        console.log('[rabbit]: trying to reconnect after an error');
        this.assertConnection();
      }, 1000);
    });
    this.rabbitConnection.on('close', () => {
      console.log('[rabbit]: connection closed');
    });
    this.rabbitConnection.on('blocked', () => {
      console.log('[rabbit]: connection blocked');
    });
    this.rabbitConnection.on('unblocked', () => {
      console.log('[rabbit]: connection unblocked');
    });
  }


  public createChannel(): Promise<Channel> {
    return new Promise((resolve, reject) => {
      this.assertConnection().then(() => {
        this.rabbitConnection.createChannel()
            .then((channel) => {
              console.log('[rabbit]: channel crated');
              this.rabbitChannels.push(channel);
              return resolve(channel);
            })
            .catch(err => {
              this.destroyConnection().then(() => {
                console.log('[rabbit]: can\'t create channel');
                return this.createChannel();
              });
            });
      });
    });
  }

  private assertConnection(): Promise<Connection> {

    return new Promise((resolve, reject) => {
      if (this.rabbitConnection) {
        this.workingOnConnection = false;
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
        console.log('trying to connect to ' + connectionUrl);
        retryPromise(() => <any>connect(connectionUrl), 5000)
            .then((connection: Connection) => {
              console.log('[rabbit]: success creating connection' + connection);
              this.destroyConnection();
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

  private async destroyConnection() {
    if (this.rabbitConnection) {
      await this.rabbitConnection.close();
      this.rabbitChannels = [];
      this.rabbitConnection = undefined;
    }
  }

}