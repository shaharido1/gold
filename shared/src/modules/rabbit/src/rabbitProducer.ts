import { RabbitChannel } from './rabbitChannel';
import { Options } from 'amqplib/properties';

export class RabbitProducer extends RabbitChannel {

  public sendToQueue(data, queueName: string = this.config.config_rabbitQueueName, options: Options.Publish = this.config.config_queueOptions) : Promise<Boolean> {
    return new Promise((resolve, reject) => {
      try {
        const sent = this.rabbitChannel.sendToQueue(queueName, new Buffer(data), options)
        return resolve(sent);
      }
      catch(e) {
        return reject(e)
      }
    })
  }






  // recover(channel) {
  //   this.rabbitChannel = channel;
  // }
}