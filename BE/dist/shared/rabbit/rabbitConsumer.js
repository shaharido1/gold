"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("rxjs/index");
const rabbitChannel_1 = require("./rabbitChannel");
class RabbitConsumer extends rabbitChannel_1.RabbitChannel {
    clientConsume(queue = this.config.config_rabbitQueueName, options = this.config.config_queueOptions) {
        this.queue = queue;
        this.queueOptions = options;
        return new index_1.Observable((observer) => {
            this.observer = observer;
            this.consumeFromQueue();
        });
    }
    setUpListener() {
        this.rabbitChannel.on('error', () => {
            console.log('[rabbitChanel]: error');
            this.closeChannel().then(() => {
                this.consumeFromQueue();
            });
        });
        this.rabbitChannel.on('close', () => {
            console.log('[rabbitChanel]: connection closed');
            this.closeChannel().then(() => {
                this.consumeFromQueue();
            });
        });
        this.rabbitChannel.on('blocked', () => {
            console.log('[rabbit]: connection blocked');
        });
        this.rabbitChannel.on('unblocked', () => {
            console.log('[rabbit]: connection unblocked');
        });
    }
    consumeFromQueue() {
        if (this.observer) {
            this.assertQueue()
                .then(channel => {
                console.log('[rabbit]: start consuming');
                this.setUpListener();
                channel.consume(this.queue, (msg) => {
                    this.observer.next(msg);
                }, this.queueOptions)
                    .then((consumerTag) => {
                    this.consumerTag = consumerTag;
                })
                    .catch(err => {
                    this.closeChannel();
                    console.log('[rabbit]: can\'t consume');
                    return this.consumeFromQueue();
                });
            })
                .catch(err => {
                console.log("fatal2");
                this.observer.error("fatal!");
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