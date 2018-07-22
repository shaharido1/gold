import { Connection } from 'amqplib';
import { RabbitConfig } from '../../interface/rabitConfig';
import { RabbitConsumer } from './rabbitConsumer';
import { RabbitProducer } from './rabbitProducer';
export declare enum CreatesType {
    PRODUCER = "producer",
    CONSUMER = "consumer"
}
export declare class RabbitConnectionManager {
    config: RabbitConfig;
    private rabbitConnection;
    private rabbitChannels;
    private workingOnConnection;
    private consumers;
    private producers;
    constructor(rabbitConfig: RabbitConfig, connection?: any);
    private setUpListener;
    reconnect(): void;
    spawnQueueWorker(isConsumerOrProducer: CreatesType): Promise<RabbitConsumer | RabbitProducer>;
    reCreateChannel(): any;
    assertConnection(): Promise<Connection>;
    private destroyConnection;
    clean(): void;
}
