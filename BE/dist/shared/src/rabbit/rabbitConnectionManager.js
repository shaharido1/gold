"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const rabbit_config_default_1 = require("./rabbit.config.default");
const utils_1 = require("../utils/utils");
const rabbitConsumer_1 = require("./rabbitConsumer");
const rabbitProducer_1 = require("./rabbitProducer");
var CreatesType;
(function (CreatesType) {
    CreatesType["PRODUCER"] = "producer";
    CreatesType["CONSUMER"] = "consumer";
})(CreatesType = exports.CreatesType || (exports.CreatesType = {}));
;
class RabbitConnectionManager {
    constructor(rabbitConfig, connection) {
        this.rabbitChannels = [];
        this.workingOnConnection = false;
        this.consumers = [];
        this.producers = [];
        this.config = rabbitConfig || rabbit_config_default_1.rabbitDefaultConfig;
        if (connection) {
            this.rabbitConnection = connection;
        }
    }
    setUpListener() {
        this.rabbitConnection.on('error', () => {
            console.log('[rabbitConnection]: error');
            this.reconnect();
        });
        this.rabbitConnection.on('close', () => {
            console.log('[rabbitConnection]: connection closed');
            this.reconnect();
        });
        this.rabbitConnection.on('blocked', () => {
            console.log('[rabbitConnection]: connection blocked');
        });
        this.rabbitConnection.on('unblocked', () => {
            console.log('[rabbitConnection]: connection unblocked');
        });
    }
    reconnect() {
        this.destroyConnection().then(() => {
            setTimeout(() => {
                console.log('[rabbitConnection]: trying to reconnect after an error');
                this.assertConnection().then(() => {
                    [this.consumers, this.producers].forEach((arr) => {
                        arr.forEach((queueHandler) => {
                            this.rabbitConnection.createChannel().then((channel) => (queueHandler.recover(channel)));
                        });
                    });
                });
            }, 1000);
        });
    }
    spawnQueueWorker(isConsumerOrProducer) {
        return new Promise((resolve, reject) => {
            this.assertConnection().then(() => {
                console.log('[rabbitConnection]: trying to create new channel');
                this.rabbitConnection.createChannel()
                    .then((channel) => {
                    console.log('[rabbitConnection]: new channel crated');
                    let queueHandler;
                    switch (isConsumerOrProducer) {
                        case 'consumer':
                            queueHandler = new rabbitConsumer_1.RabbitConsumer(this.config, channel, this.reCreateChannel);
                            this.consumers.push(queueHandler);
                            break;
                        case 'producer':
                            queueHandler = new rabbitProducer_1.RabbitProducer(this.config, channel, this.reCreateChannel);
                            this.producers.push(queueHandler);
                            break;
                    }
                    // todo push channels?
                    // this.rabbitChannels.push(channel);
                    return resolve(queueHandler);
                })
                    .catch(err => {
                    console.log('[rabbitConnection]: can\'t create channel due to err - ' + err);
                    this.destroyConnection().then(() => {
                        return this.spawnQueueWorker(isConsumerOrProducer);
                    });
                });
            });
        });
    }
    reCreateChannel() {
        // todo push channels?
        // check bind this..
        return this.rabbitConnection.createChannel();
    }
    assertConnection() {
        return new Promise((resolve, reject) => {
            if (this.rabbitConnection) {
                return resolve(this.rabbitConnection);
            }
            else if (this.workingOnConnection) {
                setTimeout(() => {
                    return reject();
                }, 1000);
            }
            else {
                this.workingOnConnection = true;
                const { config_rabbitUser, config_rabbitPassword, config_rabbitHost, config_rabbitPort } = this.config;
                const connectionUrl = `amqp://${config_rabbitUser}:${config_rabbitPassword}@${config_rabbitHost}:${config_rabbitPort}`;
                console.log('[rabbitConnection]: trying to connect to ' + connectionUrl);
                utils_1.retryPromise(() => amqplib_1.connect(connectionUrl), 5000)
                    .then((connection) => {
                    console.log('[rabbitConnection]: success creating connection');
                    this.workingOnConnection = false;
                    this.rabbitConnection = connection;
                    this.setUpListener();
                    return resolve(connection);
                })
                    .catch(err => {
                    return reject(err);
                });
            }
        });
    }
    destroyConnection() {
        return new Promise((resolve, rejects) => {
            if (this.rabbitConnection) {
                this.rabbitConnection.close()
                    .then(() => {
                    this.clean();
                    resolve();
                })
                    .catch(err => {
                    console.log('[rabbitConnection]: destroy Connection dont work');
                    this.clean();
                    resolve();
                });
            }
        });
    }
    clean() {
        this.rabbitConnection = undefined;
        this.rabbitChannels = [];
    }
}
exports.RabbitConnectionManager = RabbitConnectionManager;
//# sourceMappingURL=rabbitConnectionManager.js.map