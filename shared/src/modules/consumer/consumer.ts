import { RabbitConsumer } from '../rabbit/src/rabbitConsumer';
import { Options } from 'amqplib/properties';
import { Connection, Message } from 'amqplib';
import { Subscription } from 'rxjs/index';
import { RabbitConfig } from '../../interface/rabitConfig';
import { CreatesType, RabbitConnectionManager } from '../rabbit/src/rabbitConnectionManager';
import { RabbitProducer } from '../rabbit/src/rabbitProducer';


export class Consumer {

  protected rabbitConsumers: RabbitConsumer;
  private subscriptions: Array<Subscription> = [];
  private connectionManager: RabbitConnectionManager;
  private rabbitConfig: RabbitConfig;


  constructor(rabbitConfig, connectionManager) {
    this.rabbitConfig = rabbitConfig;
    this.connectionManager = connectionManager;
    // this.rabbitConsumers.push(new RabbitConsumer(rabbitConfig, connection));
  }

  init(): Promise<void> {
    console.log('init consumer');
    return new Promise((resolve, reject) => {
      this.connectionManager.spawnQueueWorker(CreatesType.CONSUMER)
          .then((rabbitConsumer: RabbitConsumer) => {
            console.log('[consumer]: new worker spawn consumer');
            this.rabbitConsumers = rabbitConsumer;
            resolve();
          });
    });

  }




  initChannels(numberOfChannels = 10) {
    let i = 0;
    while (i < numberOfChannels) {
      // this.rabbitConsumers.push(new RabbitConsumer(this.rabbitConfig, this.connection));
      i++;
    }
  }


  consumeFromQueue(promiseFunction: (data) => Promise<any>, queue?, options?: Options.Consume) {
    return new Promise((resolve, reject) => {

      const subscription = this.rabbitConsumers.clientConsume(queue, options)
          .subscribe((data) => {
            promiseFunction(data)
                .then(() => this.ack(data))
                .catch(err => {
                  console.log(err);
                  if (!this.rabbitConsumers.clientConsume()) {
                    subscription.unsubscribe();
                    this.cancel(data);
                    return reject();
                  }
                });
          });
      this.subscriptions.push(subscription);
    });
  }

  ack(msg: Message) {
    return this.rabbitConsumers.ack(msg);
  }

  cancel(msg: Message) {
    return this.rabbitConsumers.cancel(msg);
  }

  destory() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
