"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = require("amqplib/callback_api");
class RabbitAdapter {
    constructor(rabbitConfig) {
        this.config = rabbitConfig || {
            config_rabbitHost: '10.0.75.1',
            config_rabbitPort: '5672',
            config_rabbitUser: 'guest',
            config_rabbitPassword: 'guest',
            config_rabbitQueueName: 'q',
            config_persistent: true
        };
    }
    intervalConnection() {
        let i = 0;
        return new Promise((resolve, reject) => {
            const tryToConnect = setInterval(() => {
                this.connect()
                    .then((connection) => {
                    clearInterval(tryToConnect);
                    return resolve(connection);
                })
                    .catch(err => console.log("failed for the " + i++ + "time"));
            }, 10000);
        });
    }
    initConnection() {
        return new Promise((resolve, reject) => {
            this.intervalConnection().then(() => {
                this.createChannel().then(() => {
                    console.log(this.config);
                    this.assertQueue(this.config.config_rabbitQueueName).then(ok => {
                        return resolve({ ok: ok, channel: this.rabbitChannel });
                    });
                });
            }).catch(() => reject('failed to connect'));
        });
    }
    sendToQueue(message, queue = this.config.config_rabbitQueueName) {
        this.rabbitChannel.sendToQueue(queue, Buffer.from(message), { persistent: this.config.config_persistent });
    }
    connect() {
        return new Promise((resolve, reject) => {
            console.log('trying to connect to ' + `amqp://${this.config.config_rabbitUser}:${this.config.config_rabbitPassword}@${this.config.config_rabbitHost}:${this.config.config_rabbitPort}`);
            callback_api_1.connect(`amqp://${this.config.config_rabbitUser}:${this.config.config_rabbitPassword}@${this.config.config_rabbitHost}:${this.config.config_rabbitPort}`, (err, conn) => {
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
}
exports.RabbitAdapter = RabbitAdapter;
//# sourceMappingURL=rabbit.js.map