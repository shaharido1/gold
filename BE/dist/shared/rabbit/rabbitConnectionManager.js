"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            this.rabbitConnection = undefined;
            setTimeout(() => {
                console.log('[rabbit]: trying to reconnect after an error');
                this.assertConnection();
            }, 1000);
        });
        this.rabbitConnection.on('close', () => {
            console.log('[rabbit]: connection closed');
        });
        this.rabbitConnection.on('blocked', () => {
            console.log('[rabbit]: connection blocked');
        });
        this.rabbitConnection.on('unblocked', () => {
            console.log('[rabbit]: connection unblocked');
        });
    }
    createChannel() {
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
                console.log('trying to connect to ' + connectionUrl);
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
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rabbitConnection) {
                yield this.rabbitConnection.close();
                this.rabbitChannels = [];
                this.rabbitConnection = undefined;
            }
        });
    }
}
exports.RabbitConnectionManager = RabbitConnectionManager;
//# sourceMappingURL=rabbitConnectionManager.js.map