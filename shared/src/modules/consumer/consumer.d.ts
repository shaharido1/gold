import { RabbitConsumer } from '../rabbit/src/rabbitConsumer';
import { Options } from 'amqplib/properties';
import { Message } from 'amqplib';
export declare class Consumer {
    protected rabbitConsumers: RabbitConsumer;
    private subscriptions;
    private connectionManager;
    private rabbitConfig;
    constructor(rabbitConfig: any, connectionManager: any);
    init(): Promise<void>;
    initChannels(numberOfChannels?: number): void;
    consumeFromQueue(promiseFunction: (data: any) => Promise<any>, queue?: any, options?: Options.Consume): Promise<{}>;
    ack(msg: Message): void;
    cancel(msg: Message): Promise<{}>;
    destory(): void;
}
