import { RabbitChannel } from './rabbitChannel';
import { Options } from 'amqplib/properties';
export declare class RabbitProducer extends RabbitChannel {
    sendToQueue(data: any, queueName?: string, options?: Options.Publish): boolean;
}
