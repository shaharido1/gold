import { Message } from 'amqplib';
import { GoldServer } from '../../shared/src/modules/goldServer/goldServer';
export declare class ValidateNRepack extends GoldServer {
    private connectionManager;
    private consumer;
    private connection;
    constructor();
    init(): void;
    doStuff(msg: any): Promise<Message>;
}
