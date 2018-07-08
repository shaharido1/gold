import { RabbitChannel } from './rabbitChannel';
import { Options } from 'amqplib/properties';

export class RabbitProducer extends RabbitChannel {

  public sendToQueue(data, queueName: string = this.config.config_rabbitQueueName, options: Options.Publish = this.config.config_queueOptions) {
    console.log('send to Q');
    try {
      this.rabbitChannel.sendToQueue(queueName, new Buffer(data));
      return true
    }
    catch (e) {
      return false;
    }
  }


}