/// <reference types="node" />
import { Message, Options } from 'amqplib/properties';
import { Observable, Observer } from 'rxjs/index';
import { RabbitChannel } from './rabbitChannel';
import { EventEmitter } from "events";
export declare class RabbitConsumer extends RabbitChannel {
    private consumerTag;
    observer: Observer<Message>;
    protected recoverEvent: EventEmitter;
    clientConsume(queue?: string, options?: Options.Consume): Observable<Message>;
    protected setUpListener(): void;
    private newConsumeFromQueue;
    private consumeFromQueue;
    cancel(msg: Message): Promise<{}>;
    ack(msg: Message): void;
}
