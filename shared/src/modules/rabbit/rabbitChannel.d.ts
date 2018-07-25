import { Options } from 'amqplib/properties';
import { RabbitConfig } from '../../interface/rabitConfig';
import { Channel } from 'amqplib';
import { RabbitConnectionManager } from './rabbitConnectionManager';
import { Observable } from 'rxjs/index';
import { Observer } from 'rxjs/internal/types';
export declare abstract class RabbitChannel {
    rabbitConnectionManager: RabbitConnectionManager;
    protected config: RabbitConfig;
    protected rabbitChannel: Channel;
    protected queue: string;
    protected queueOptions: Options.Consume;
    createChannel: any;
    observer: Observer<any>;
    constructor(rabbitConfig: RabbitConfig, channel: any, createChannel: any);
    protected setUpListener(): void;
    channelsEvent(): Observable<{}>;
    getChannel(): Promise<Channel>;
    recover(channel: any): void;
    closeChannel(): Promise<{}>;
    assertQueue(queue?: string, options?: Options.Consume): Promise<Channel>;
}
