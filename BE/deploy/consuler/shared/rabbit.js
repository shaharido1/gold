"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
class Rabbit {
    constructor(rabbitAddress) {
        this.rabbitAddress = rabbitAddress || {
            host: process.env.rabbitHost || "10.0.75.1",
            port: process.env.rabbitPort || "5672"
        };
    }
    initConnection(queue) {
        return new Promise((resolve, reject) => {
            this.intervalConnection().then(() => {
                this.createChannel().then(() => {
                    this.assertQueue(queue).then(ok => {
                        return resolve({ ok: ok, channel: this.rabbitChannel });
                    });
                });
            }).catch(() => reject("failed to connect"));
        });
    }
    intervalConnection() {
        return new Promise((resolve, reject) => {
            const tryToConnect = setInterval(() => {
                this.connect()
                    .then((connection) => {
                    clearInterval(tryToConnect);
                    return resolve(connection);
                })
                    .catch(err => err);
            }, 10000);
        });
    }
    connect() {
        return new Promise((resolve, reject) => {
            console.log("trying to connect to " + `amqp://guest:guest@${this.rabbitAddress.host}:${this.rabbitAddress.port}`);
            callback_api_1.default.connect(`amqp://guest:guest@${this.rabbitAddress.host}:${this.rabbitAddress.port}`, (err, conn) => {
                if (conn) {
                    console.log("connected to rabbit!");
                    this.rabbitConnection = conn;
                    return resolve(conn);
                }
                else if (err) {
                    console.log("fail to connect");
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
                    console.log("fail to connect");
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
exports.Rabbit = Rabbit;
//# sourceMappingURL=rabbit.js.map