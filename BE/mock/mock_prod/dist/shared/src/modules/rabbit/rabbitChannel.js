"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbit_config_default_1 = require("./rabbit.config.default");
const index_1 = require("rxjs/index");
class RabbitChannel {
    constructor(rabbitConfig, channel, createChannel) {
        this.config = rabbitConfig || rabbit_config_default_1.rabbitDefaultConfig;
        this.createChannel = createChannel;
        this.rabbitChannel = channel;
    }
    setUpListener() {
        this.rabbitChannel.on('error', () => {
            console.log('[rabbitChanel]: error');
            this.closeChannel().then(() => {
                this.assertQueue();
            });
        });
        this.rabbitChannel.on('close', () => {
            console.log('[rabbitChanel]: connection closed');
            this.closeChannel().then(() => {
                this.assertQueue();
            });
        });
        this.rabbitChannel.on('blocked', () => {
            console.log('[rabbitChanel]: connection blocked');
        });
        this.rabbitChannel.on('unblocked', () => {
            console.log('[rabbitChanel]: connection unblocked');
        });
    }
    channelsEvent() {
        return new index_1.Observable((observer) => this.observer = observer);
    }
    getChannel() {
        return new Promise((resolve, reject) => {
            if (this.rabbitChannel) {
                return resolve(this.rabbitChannel);
            }
            else {
                this.createChannel
                    .then(channel => {
                    this.closeChannel();
                    this.rabbitChannel = channel;
                    // this.setUpListener();
                    return resolve(channel);
                })
                    .catch(err => {
                    console.log(err);
                    console.log('fatal - can\'t create channel after multiple retries');
                    return reject(err);
                });
            }
        });
    }
    recover(channel) {
        // todo
        this.rabbitChannel = channel;
        this.observer.next('recover');
    }
    closeChannel() {
        return new Promise((resolve, reject) => {
            if (this.rabbitChannel) {
                this.rabbitChannel.close();
                this.rabbitChannel = undefined;
                resolve();
            }
        });
    }
    assertQueue(queue = this.queue, options = this.queueOptions) {
        return new Promise((resolve, reject) => {
            this.getChannel()
                .then(channel => {
                channel.assertQueue(queue, options)
                    .then((replay) => {
                    console.log(`[rabbit]: queue ${replay.queue} has ${replay.consumerCount} consumers, and ${replay.messageCount} messages`);
                    return resolve(channel);
                })
                    .catch(err => {
                    this.rabbitChannel = undefined;
                    return this.assertQueue(queue, options);
                });
            }).catch(err => {
                console.log('fatal');
                return reject(err);
            });
        });
    }
}
exports.RabbitChannel = RabbitChannel;
//# sourceMappingURL=rabbitChannel.js.map