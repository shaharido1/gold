"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitConnectionManager_1 = require("../rabbit/rabbitConnectionManager");
class Producer {
    constructor(rabbitConfig, connectionManager) {
        this.connectionManager = connectionManager;
    }
    init() {
        // enum
        // only one...
        console.log('init producer');
        this.connectionManager.spawnQueueWorker(rabbitConnectionManager_1.CreatesType.PRODUCER).then((rabbitProducer) => {
            console.log('[producer]: new worker spawn producer');
            this.rabbitProducer = rabbitProducer;
            this.listener = this.rabbitProducer.channelsEvent();
        });
    }
    sendToQueue() {
        return this.rabbitProducer.sendToQueue;
    }
    generateToQueue(obs, qname, options) {
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
exports.Producer = Producer;
//# sourceMappingURL=producer.js.map