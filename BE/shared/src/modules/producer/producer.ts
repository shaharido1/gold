import { RabbitProducer } from '../rabbit/rabbitProducer';
import { Options } from 'amqplib/properties';
import { Observable } from 'rxjs/index';
import { CreatesType, RabbitConnectionManager } from '../rabbit/rabbitConnectionManager';


export class Producer {
  protected rabbitProducer: RabbitProducer;
  private connectionManager: RabbitConnectionManager;
  public listener: Observable<any>;

  constructor(rabbitConfig, connectionManager) {
    this.connectionManager = connectionManager;
  }

  public init() {
    // enum
    // only one...
    console.log('init producer');
    this.connectionManager.spawnQueueWorker(CreatesType.PRODUCER).then((rabbitProducer: RabbitProducer) => {
      console.log('[producer]: new worker spawn producer');
      this.rabbitProducer = rabbitProducer;
      this.listener = this.rabbitProducer.channelsEvent();
    });
  }


  public sendToQueue() {
    return this.rabbitProducer.sendToQueue;
  }

  public generateToQueue(obs: Observable<any>, qname: string, options: Options.Consume) {
    return new Promise((resolve, reject) => {
      const subscriber = obs.subscribe(data => {
        console.log('d?');
        if (!this.rabbitProducer.sendToQueue(data, qname, options)) {
          console.log('unsubscribe');
          subscriber.unsubscribe();
          return reject();
        }
      });
    });
  }


}
