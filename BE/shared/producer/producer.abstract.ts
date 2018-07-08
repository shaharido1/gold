import { RabbitProducer } from '../rabbit/rabbitProducer';
import { Channel } from 'amqplib';
import { Options } from 'amqplib/properties';
import { Observable } from 'rxjs/index';


export class Producer {
  protected rabbitProducer: RabbitProducer;

  constructor(rabbitConfig) {
    this.rabbitProducer = new RabbitProducer(rabbitConfig);

  }

  public init(): Promise<Channel> {
    return this.rabbitProducer.getChannel();
  }

  public sendToQueue() {
    return this.rabbitProducer.sendToQueue;
  }

  public generateToQueue(obs: Observable<any>, qname: string, options: Options.Consume) {
    return new Promise((resolve, reject) => {
      const subscriber = obs.subscribe(data => {
        if (!this.rabbitProducer.sendToQueue(data, qname, options)) {
          subscriber.unsubscribe();
          return reject()
        }
      });
    });
  }


}
