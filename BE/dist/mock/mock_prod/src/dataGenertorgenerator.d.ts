import { GoldServer } from '../../../shared/src/modules/goldServer/goldServer';
export declare class DataGenerator extends GoldServer {
    private source;
    private mockDataGen;
    private connectionManager;
    private producer;
    private eventListener;
    constructor();
    init(): void;
    sendSourceToQueue(): void;
}
