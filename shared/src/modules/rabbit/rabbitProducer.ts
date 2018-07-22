import { RabbitChannel } from './rabbitChannel';
import { Options } from 'amqplib/properties';

export class RabbitProducer extends RabbitChannel {

  public sendToQueue(data, queueName: string = this.config.config_rabbitQueueName, options: Options.Publish = this.config.config_queueOptions) {
    try {
      this.rabbitChannel.sendToQueue(queueName, new Buffer(data), options);
      console.log('send to Q');
      return true;
    }
    catch (e) {
      return false;
    }
  }


  // recover(channel) {
  //   this.rabbitChannel = channel;
  // }
}