"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redis_config_defalt_1 = require("./redis.config.defalt");
const redisListenEvents_1 = require("./model/redisListenEvents");
class RedisAdapter {
    constructor(redisConfig) {
        this.config = redisConfig || redis_config_defalt_1.redisDefaultConfig;
    }
    initClientConnection() {
        return new Promise((resolve, reject) => {
            this.redisConnect().then();
            this.client.on(redisListenEvents_1.RedisListenEvents.READY, () => {
                this.multi = this.client.multi();
                console.log('redis is ready');
                return resolve(this.client);
            });
        });
    }
    redisConnect() {
        return new Promise((resolve, reject) => {
            this.client = redis_1.createClient({
                port: this.config.config_redisPort,
                host: this.config.config_redisHost,
                retry_strategy: (options) => {
                    // console.log(options);
                    if (options.error && options.error.code === redisListenEvents_1.RedisConnectionSetup.ECONNREFUSED) {
                        console.log('connection refused');
                    }
                    if (options.total_retry_time > Number(redisListenEvents_1.RedisConnectionSetup.TOTAL_RETRY_TIMES)) {
                        return new Error('Retry time exhausted');
                    }
                    return (Number(redisListenEvents_1.RedisConnectionSetup.RETRY_TIME));
                }
            });
            this.createListeners();
            resolve();
        });
    }
    createListeners() {
        this.client.on(redisListenEvents_1.RedisListenEvents.ERROR, (err) => {
            console.error(err);
        });
        this.client.on(redisListenEvents_1.RedisListenEvents.RECONNECTING, () => {
            console.log('Connection reestablished to redis');
        });
        this.client.on(redisListenEvents_1.RedisListenEvents.CONNECT, () => {
            console.log('redis is connecting');
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