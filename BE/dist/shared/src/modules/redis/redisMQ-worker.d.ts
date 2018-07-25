import * as RSMQWorker from 'rsmq-worker';
export declare class RedisMQWorkerAdapter {
    worker: RSMQWorker;
    constructor(qName: string, host: string);
}
