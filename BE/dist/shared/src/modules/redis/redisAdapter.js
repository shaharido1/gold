"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redis_config_defalt_1 = require("./redis.config.defalt");
const redisListenEvents_1 = require("./model/redisListenEvents");
class RedisAdapter {
    constructor(redisConfig = redis_config_defalt_1.redisDefaultConfig) {
        this.config = redisConfig;
    }
    initClientConnection() {
        return new Promise((resolve, reject) => {
            this.redisConnect();
            this.client.on(redisListenEvents_1.RedisListenEvents.READY, () => {
                this.multi = this.client.multi();
                console.log('redis is ready');
                return resolve(this.client);
            });
        });
    }
    redisConnect() {
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
    // set multiple hash fields to multiple values
    setMultiFieldsToMultival(redisKey, args) {
        return new Promise((resolve, reject) => {
            this.multi.hmset(redisKey, ...args, (err, res) => {
                this.resolveCb(err, res, resolve, reject);
            });
        });
    }
    // get all fields and values in a hash
    getAllFieldsAndValues(redisKey) {
        return new Promise((resolve, reject) => {
            return this.client.HGETALL(redisKey, (err, res) => {
                this.resolveCb(err, res, resolve, reject);
            });
        });
    }
    // get the value of a hash mainField
    getValue(redisKey, subField) {
        return new Promise((resolve, reject) => {
            return this.multi.HGET(redisKey, subField, (err, res) => {
                this.resolveCb(err, res, resolve, reject);
            });
        });
    }
    // get all fields in hash
    getAllFields(key) {
        return new Promise((resolve, reject) => {
            return this.multi.HKEYS(key, (err, res) => {
                this.resolveCb(err, res, resolve, reject);
            });
        });
    }
    execData() {
        return new Promise((resolve, reject) => {
            this.multi.exec((err, res) => this.resolveCb(err, res, resolve, reject));
        });
    }
    resolveCb(err, res, resolve, reject) {
        if (res) {
            console.log(res);
            return resolve(res);
        }
        else if (err) {
            return reject(err);
        }
        else {
            return reject('error with no error message');
        }
    }
}
exports.RedisAdapter = RedisAdapter;
//# sourceMappingURL=redisAdapter.js.map