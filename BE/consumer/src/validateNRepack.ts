import { Connection, Message } from 'amqplib';
import { GoldServer } from '../../shared/goldServer/goldServer';
import { Consumer } from '../../shared/consumer/consumer';
import { RabbitConnectionManager } from '../../shared/rabbit/rabbitConnectionManager';
import { configFileLocation } from '../config/config.filePath';

export class ValidateNRepack extends GoldServer {

  private connectionManager: RabbitConnectionManager;
  private consumer: Consumer;
  private connection: Connection;

  constructor() {
    super(configFileLocation);
    this.connectionManager = new RabbitConnectionManager(this.config.rabbitConfig);
    this.init2();

  }

  init2() {
    this.connectionManager.assertConnection().then(connection => {
      this.connection = connection;
      this.consumer = new Consumer(this.config.rabbitConfig, connection);
      this.consumer.consumeFromQueue(this.doStuff)
    })
  }


  doStuff(msg): Promise<Message> {
    return new Promise((resolve, reject) => {
      console.log(msg.content.toString());
      return resolve();
    });

  }
}