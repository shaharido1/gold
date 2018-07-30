import { RabbitProducer } from '../rabbit/src/rabbitProducer';
import { Options } from 'amqplib/properties';
import { Observable } from 'rxjs/index';
export declare class Producer {
    protected rabbitProducer: RabbitProducer;
    private connectionManager;
    listener: Observable<any>;
    constructor(rabbitConfig: any, connectionManager: any);
    init(): void;
    sendToQueue(): (data: any, queueName?: string, options?: Options.Publish) => boolean;
    generateToQueue(obs: Observable<any>, qname: string, options: Options.Consume): Promise<{}>;
}
