"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitConnectionManager_1 = require("../rabbit/rabbitConnectionManager");
class Consumer {
    constructor(rabbitConfig, connectionManager) {
        this.subscriptions = [];
        this.rabbitConfig = rabbitConfig;
        this.connectionManager = connectionManager;
        // this.rabbitConsumers.push(new RabbitConsumer(rabbitConfig, connection));
    }
    init() {
        console.log('init consumer');
        return new Promise((resolve, reject) => {
            this.connectionManager.spawnQueueWorker(rabbitConnectionManager_1.CreatesType.CONSUMER)
                .then((rabbitConsumer) => {
                console.log('[consumer]: new worker spawn consumer');
                this.rabbitConsumers = rabbitConsumer;
                resolve();
            });
        });
    }
    initChannels(numberOfChannels = 10) {
        let i = 0;
        while (i < numberOfChannels) {
            // this.rabbitConsumers.push(new RabbitConsumer(this.rabbitConfig, this.connection));
            i++;
        }
    }
    consumeFromQueue(promiseFunction, queue, options) {
        return new Promise((resolve, reject) => {
            const subscription = this.rabbitConsumers.clientConsume(queue, options)
                .subscribe((data) => {
                promiseFunction(data)
                    .then(() => this.ack(data))
                    .catch(err => {
                    console.log(err);
                    if (!this.rabbitConsumers.clientConsume()) {
                        subscription.unsubscribe();
                        this.cancel(data);
                        return reject();
                    }
                });
            });
            this.subscriptions.push(subscription);
        });
    }
    ack(msg) {
        return this.rabbitConsumers.ack(msg);
    }
    cancel(msg) {
        return this.rabbitConsumers.cancel(msg);
    }
    destory() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
exports.Consumer = Consumer;
//# sourceMappingURL=consumer.js.map