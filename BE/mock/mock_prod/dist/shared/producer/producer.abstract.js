"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producer {
    constructor(rabbitConfig, connectionManager) {
        this.connectionManager = connectionManager;
    }
    init() {
        // enum
        // only one...
        console.log("init producer");
        return new Promise((resolve, reject) => {
            this.connectionManager.spawnQueueWorker(false).then((rabbitProducer) => {
                console.log("new worker spwan");
                this.rabbitProducer = rabbitProducer;
                resolve();
            });
        });
    }
    sendToQueue() {
        return this.rabbitProducer.sendToQueue;
    }
    generateToQueue(obs, qname, options) {
        return new Promise((resolve, reject) => {
            const subscriber = obs.subscribe(data => {
                console.log("d?");
                if (!this.rabbitProducer.sendToQueue(data, qname, options)) {
                    subscriber.unsubscribe();
                    return reject();
                }
            });
        });
    }
}
exports.Producer = Producer;
//# sourceMappingURL=producer.abstract.js.map