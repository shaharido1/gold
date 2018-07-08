"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const rabbit_config_default_1 = require("./rabbit.config.default");
const utils_1 = require("../utils/utils");
class RabbitConnectionManager {
    constructor(rabbitConfig, connection) {
        this.rabbitChannels = [];
        this.workingOnConnection = false;
        this.config = rabbitConfig || rabbit_config_default_1.rabbitDefaultConfig;
        if (connection) {
            this.rabbitConnection = connection;
        }
    }
    setUpListener() {
        this.rabbitConnection.on('error', () => {
            console.log('[rabbit]: error');
            this.reconnect();
        });
        this.rabbitConnection.on('close', () => {
            console.log('[rabbit]: connection closed');
            this.reconnect();
        });
        this.rabbitConnection.on('blocked', () => {
            console.log('[rabbit]: connection blocked');
        });
        this.rabbitConnection.on('unblocked', () => {
            console.log('[rabbit]: connection unblocked');
        });
    }
    reconnect() {
        this.destroyConnection().then(() => {
            setTimeout(() => {
                console.log('[rabbit]: trying to reconnect after an error');
                this.assertConnection();
            }, 1000);
        });
    }
    createChannel(isConsumerOrProducer) {
        return new Promise((resolve, reject) => {
            this.assertConnection().then(() => {
                this.rabbitConnection.createChannel()
                    .then((channel) => {
                    console.log('[rabbit]: channel crated');
                    this.rabbitChannels.push(channel);
                    return resolve(channel);
                })
                    .catch(err => {
                    this.destroyConnection().then(() => {
                        console.log('[rabbit]: can\'t create channel');
                        return this.createChannel();
                    });
                });
            });
        });
    }
    assertConnection() {
        return new Promise((resolve, reject) => {
            if (this.rabbitConnection) {
                this.workingOnConnection = false;
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
                console.log('[rabbit]: trying to connect to ' + connectionUrl);
                utils_1.retryPromise(() => amqplib_1.connect(connectionUrl), 5000)
                    .then((connection) => {
                    console.log('[rabbit]: success creating connection' + connection);
                    this.destroyConnection();
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
                    console.log('destroy Connection dont work');
                    console.log(err);
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