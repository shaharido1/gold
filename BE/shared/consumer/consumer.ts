import { RabbitConsumer } from '../rabbit/rabbitConsumer';
import { Options } from 'amqplib/properties';
import { Connection, Message } from 'amqplib';
import { Subscription } from 'rxjs/index';
import { RabbitConfig } from '../interfase/rabitConfig';


export class Consumer {

  protected rabbitConsumers: Array<RabbitConsumer> = [];
  private subscriptions: Array<Subscription> = [];
  private connection: Connection;
  private rabbitConfig: RabbitConfig;

  constructor(rabbitConfig, connection) {
    this.rabbitConfig = rabbitConfig;
    this.connection = connection;
    this.rabbitConsumers.push(new RabbitConsumer(rabbitConfig, connection));
  }

  initChannels(numberOfChannels = 10) {
    let i = 0;
    while (i < numberOfChannels) {
      this.rabbitConsumers.push(new RabbitConsumer(this.rabbitConfig, this.connection));
      i++;
    }
  }


  consumeFromQueue(promiseFunction : (data) => Promise<any>, queue?, options?: Options.Consume) {
    const subscription = this.rabbitConsumers[0].clientConsume(queue, options).subscribe((data) => {
      promiseFunction(data)
          .then(() => this.ack(data))
          .catch(err => {
            this.cancel();
          })
    });
    this.subscriptions.push(subscription);
  }

  ack(msg : Message) {
    return this.rabbitConsumers[0].ack(msg)
  }

  cancel() {
    return this.rabbitConsumers[0].cancel;
  }

  destory() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
