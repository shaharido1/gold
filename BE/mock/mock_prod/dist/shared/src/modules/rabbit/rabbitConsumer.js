"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("rxjs/index");
const rabbitChannel_1 = require("./rabbitChannel");
const events_1 = require("events");
class RabbitConsumer extends rabbitChannel_1.RabbitChannel {
    constructor() {
        super(...arguments);
        this.recoverEvent = new events_1.EventEmitter();
    }
    clientConsume(queue = this.config.config_rabbitQueueName, options = this.config.config_queueOptions) {
        this.queue = queue;
        this.queueOptions = options;
        return new index_1.Observable((observer) => {
            this.observer = observer;
            this.newConsumeFromQueue();
        });
    }
    setUpListener() {
        this.rabbitChannel.on('error', () => {
            console.log('[rabbitConsumer]: error');
            // this.closeChannel().then( () => {
            //   this.consumeFromQueue();
            // })
        });
        this.rabbitChannel.on('close', () => {
            console.log('[rabbitConsumer]: connection closed');
            // this.closeChannel().then( () => {
            //   this.consumeFromQueue();
            // })
        });
        this.rabbitChannel.on('blocked', () => {
            console.log('[rabbitConsumer]: connection blocked');
        });
        this.rabbitChannel.on('unblocked', () => {
            console.log('[rabbitConsumer]: connection unblocked');
        });
    }
    newConsumeFromQueue() {
        try {
            this.setUpListener();
            this.rabbitChannel.consume(this.queue, (msg) => {
                this.observer.next(msg);
            }, this.queueOptions)
                .then((consumerTag) => {
                this.consumerTag = consumerTag;
            })
                .catch(err => {
                this.closeChannel();
                console.log('[rabbitConsumer]: can\'t consume');
                return this.newConsumeFromQueue();
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    consumeFromQueue() {
        if (this.observer) {
            this.assertQueue()
                .then(channel => {
                console.log('[rabbitConsumer]: start consuming');
                this.setUpListener();
                channel.consume(this.queue, (msg) => {
                    this.observer.next(msg);
                }, this.queueOptions)
                    .then((consumerTag) => {
                    this.consumerTag = consumerTag;
                })
                    .catch(err => {
                    this.closeChannel();
                    console.log('[rabbitConsumer]: can\'t consume');
                    return this.consumeFromQueue();
                });
            })
                .catch(err => {
                console.log('[rabbitConsumer]: fatal2');
                this.observer.error('[rabbitConsumer]: fatal!');
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