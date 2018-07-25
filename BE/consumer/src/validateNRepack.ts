import { Connection, Message } from 'amqplib';
import { GoldServer } from '../../shared/src/modules/goldServer/goldServer';
import { Consumer } from '../../shared/src/modules/consumer/consumer';
import { RabbitConnectionManager } from '../../shared/src/modules/rabbit/rabbitConnectionManager';
import { configFileLocation } from '../config/config.filePath';

export class ValidateNRepack extends GoldServer {

  private connectionManager: RabbitConnectionManager;
  private consumer: Consumer;
  private connection: Connection;

  constructor() {
    super(configFileLocation);
    this.init();

  }

  init() {
    this.connectionManager = new RabbitConnectionManager(this.config.rabbitConfig);
    this.consumer = new Consumer(this.config.rabbitConfig, this.connectionManager);
    this.consumer.init()
        .then(() => {
          this.consumer.consumeFromQueue(this.doStuff);
        })
        .catch((err) => console.log(err));
    // this.connectionManager.assertConnection().then(connection => {
    //   this.connection = connection;
    //   this.consumer.consumeFromQueue(this.doStuff);
    // });
  }

  doStuff(msg): Promise<Message> {
    return new Promise((resolve, reject) => {
      console.log(msg.content.toString());
      return resolve();
    });

  }
}
