"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = require("amqplib/callback_api");
const rabbit_config_default_1 = require("./rabbit.config.default");
class RabbitAdapter {
    constructor(rabbitConfig) {
        this.config = rabbitConfig || rabbit_config_default_1.rabbitDefaultConfig;
    }
    initConnection() {
        return new Promise((resolve, reject) => {
            this.intervalConnection().then(() => {
                this.createChannel().then(() => {
                    this.assertQueue(this.config.config_rabbitQueueName).then(ok => {
                        return resolve({ ok: ok, channel: this.rabbitChannel });
                    });
                });
            }).catch(() => reject('failed to connect'));
        });
    }
    intervalConnection() {
        let i = 0;
        return new Promise((resolve, reject) => {
            const tryToConnect = setInterval(() => {
                this.connectToRabbitMQ()
                    .then((connection) => {
                    clearInterval(tryToConnect);
                    return resolve(connection);
                })
                    .catch(err => console.log('failed for the ' + i++ + 'time, due to ' + err));
            }, 10000);
        });
    }
    connectToRabbitMQ() {
        const { config_rabbitUser, config_rabbitPassword, config_rabbitHost, config_rabbitPort } = this.config;
        return new Promise((resolve, reject) => {
            console.log('trying to connect to ' + `amqp://${config_rabbitUser}:${config_rabbitPassword}@${config_rabbitHost}:${config_rabbitPort}`);
            callback_api_1.connect(`amqp://${config_rabbitUser}:${config_rabbitPassword}@${config_rabbitHost}:${config_rabbitPort}`, (err, conn) => {
                if (conn) {
                    console.log('connected to rabbit!');
                    this.rabbitConnection = conn;
                    return resolve(conn);
                }
                else if (err) {
                    console.log('fail to connect');
                    console.log(err);
                    return reject();
                }
            });
        });
    }
    createChannel(connection) {
        return new Promise((resolve, reject) => {
            const conn = connection || this.rabbitConnection;
            conn.createChannel((err, channel) => {
                if (channel) {
                    this.rabbitChannel = channel;
                    return resolve(channel);
                }
                else if (err) {
                    console.log('fail to connect');
                    console.log(err);
                    return reject();
                }
            });
        });
    }
    assertQueue(queue, options) {
        return new Promise((resolve, reject) => {
            this.rabbitChannel.assertQueue(queue, options, (err, ok) => {
                if (ok) {
                    return resolve(ok);
                }
                else if (err) {
                    console.log(err);
                    return reject();
                }
            });
        });
    }
    sendToQueue(message, queue = this.config.config_rabbitQueueName) {
        this.rabbitChannel.sendToQueue(queue, Buffer.from(message), { persistent: this.config.config_persistent });
    }
    consumeFromQueue(queue = this.config.config_rabbitQueueName, options = this.config.config_queueOptions) {
        return new Promise((resolve, reject) => {
            this.rabbitChannel.consume(queue, (msg) => resolve(msg), options, (err, ok) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                else if (ok) {
                    console.log("ok" + JSON.stringify(ok));
                }
            });
        });
    }
}
exports.RabbitAdapter = RabbitAdapter;
//# sourceMappingURL=rabbit.js.map