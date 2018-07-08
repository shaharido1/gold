"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbit_config_default_1 = require("./rabbit.config.default");
const index_1 = require("rxjs/index");
const rabbitConnectionManager_1 = require("./rabbitConnectionManager");
class RabbitConsumer {
    constructor(rabbitConfig, connection) {
        this.config = rabbitConfig || rabbit_config_default_1.rabbitDefaultConfig;
        this.rabbitConnectionManager = new rabbitConnectionManager_1.RabbitConnectionManager(this.config, connection);
    }
    setUpListener() {
        this.rabbitChannel.on('error', () => {
            this.rabbitChannel = undefined;
            this.consumeFromQueue();
        });
        this.rabbitChannel.on('close', () => {
            console.log('connection closed');
            this.rabbitChannel = undefined;
            this.consumeFromQueue();
        });
        this.rabbitChannel.on('blocked', () => {
            console.log('[rabbit]: connection blocked');
        });
        this.rabbitChannel.on('unblocked', () => {
            console.log('[rabbit]: connection unblocked');
        });
    }
    getChannel() {
        return new Promise((resolve, reject) => {
            if (this.rabbitChannel) {
                return resolve(this.rabbitChannel);
            }
            this.rabbitConnectionManager.createChannel()
                .then(channel => {
                this.rabbitChannel = channel;
                this.setUpListener();
                return resolve(channel);
            })
                .catch(err => {
                console.log(err);
                console.log('fatal - can\'t create channel after multiple retries');
                this.observer.error('fatal');
                return reject(err);
            });
        });
    }
    assertQueue(queue = this.queue, options = this.queueOptions) {
        return new Promise((resolve, reject) => {
            this.getChannel()
                .then(channel => {
                channel.assertQueue(queue, options)
                    .then((replay) => {
                    console.log(`queue ${replay.queue} has ${replay.consumerCount} consumers, and ${replay.messageCount} messages`);
                    return resolve(channel);
                })
                    .catch(err => {
                    this.rabbitChannel = undefined;
                    return this.assertQueue(queue, options);
                });
            });
        });
    }
    clientConsume(queue = this.config.config_rabbitQueueName, options = this.config.config_queueOptions) {
        this.queue = queue;
        this.queueOptions = options;
        return new index_1.Observable((observer) => {
            this.observer = observer;
            this.consumeFromQueue();
        });
    }
    consumeFromQueue() {
        if (this.observer) {
            this.assertQueue()
                .then(channel => {
                console.log('[rabbit]: start consuming');
                channel.consume(this.queue, (msg) => {
                    this.observer.next(msg);
                }, this.queueOptions)
                    .then((consumerTag) => {
                    this.consumerTag = consumerTag;
                })
                    .catch(err => {
                    this.rabbitChannel = undefined;
                    console.log('[rabbit]: can\'t consume');
                    return this.consumeFromQueue();
                });
            });
        }
    }
    cancel(msg) {
        console.log('[rabbit]: cancel function');
        return new Promise((resolve, reject) => {
            this.rabbitChannel.nack(msg);
            this.rabbitChannel.cancel(this.consumerTag.consumerTag);
            this.observer.complete();
        });
    }
    ack(msg) {
        this.rabbitChannel.ack(msg);
    }
}
exports.RabbitConsumer = RabbitConsumer;
//# sourceMappingURL=rabbitConsumer.js.map