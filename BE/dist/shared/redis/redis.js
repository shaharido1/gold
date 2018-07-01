"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redis_config_defalt_1 = require("./redis.config.defalt");
const redisListenEvents_1 = require("./model/redisListenEvents");
class RedisAdapter {
    constructor(redisConfig) {
        this.config = redisConfig || redis_config_defalt_1.redisDefaultConfig;
        // todo chane error listener
        // this.setErrorListener();
    }
    initClientConnection() {
        return new Promise((resolve, reject) => {
            const tryToConnect = setInterval(() => {
                this.redisConnect()
                    .then(() => {
                    clearInterval(tryToConnect);
                    this.multi = this.client.multi();
                    console.log('redis Created');
                    return resolve(this.client);
                })
                    .catch(err => err);
            }, this.config.reconnect);
        });
    }
    setErrorListener() {
        this.client.on(redisListenEvents_1.RedisListenEvents.ERROR, (err) => {
            console.log(err);
        });
    }
    redisConnect() {
        return new Promise((resolve, reject) => {
            this.client = redis_1.createClient({
                port: this.config.config_redisPort,
                host: this.config.config_redisHost,
                retry_strategy: (options) => {
                    if (options.error && options.error.code === 'ECONNREFUSED') {
                        // End reconnecting on a specific error and flush all commands with
                        // a individual error
                        return new Error('The server refused the connection');
                    }
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        // End reconnecting after a specific timeout and flush all commands
                        // with a individual error
                        return new Error('Retry time exhausted');
                    }
                    if (options.attempt > 10) {
                        // End reconnecting with built in error
                        return undefined;
                    }
                    // reconnect after
                    return (3000);
                }
            });
            this.client.on(redisListenEvents_1.RedisListenEvents.READY, () => {
                return resolve();
            });
        });
    }
    sendToQueue(list, key) {
        return new Promise((resolve, reject) => {
            list.forEach(data => {
                this.multi.hmset(`${key}:${data.id.toString()}`, redisListenEvents_1.RedisListenEvents.MESSAGE, JSON.stringify(data), (err, res) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
            this.multi.exec((err, replies) => {
                if (replies) {
                    return resolve(replies);
                }
                err ? console.log(err) : console.log('error with no error message');
                return reject(err);
            });
        });
    }
}
exports.RedisAdapter = RedisAdapter;
//# sourceMappingURL=redis.js.map