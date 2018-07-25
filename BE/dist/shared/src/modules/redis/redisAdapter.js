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
            this.multi.hmset(redisKey, args, (err, res) => this.resolveCb(err, res, resolve, reject));
        });
    }
    // add one or more members to a sorted set, or update its score if it already exists.
    pushToSortedSet(redisKey, args) {
        return new Promise((resolve) => {
            this.multi.zadd(redisKey, args, (err, res) => {
                return resolve(res);
            });
        });
    }
    // Return a range of members in a sorted set, by score, with scores ordered from high to low.
    getRangeSetByScoreHighToLow(redisKey, min = '+inf', max = '-inf', withscores, limit, offset, count, passToResolve) {
        return new Promise((resolve, reject) => {
            this.multi.ZREVRANGEBYSCORE(redisKey, min, max, withscores, limit, offset, count, (err, res) => {
                return this.resolveCb(err, res, resolve, reject, passToResolve);
            });
        });
    }
    // get all fields and values in a hash
    getAllFieldsAndValues(redisKey, passToResolve) {
        return new Promise((resolve, reject) => {
            this.multi.HGETALL(redisKey, (err, res) => {
                return this.resolveCb(err, res, resolve, reject, passToResolve);
            });
        });
    }
    // get the value of a hash mainFields
    getValue(redisKey, subField, passToResolve) {
        return new Promise((resolve, reject) => {
            this.multi.HMGET(redisKey, subField, (err, res) => {
                return this.resolveCb(err, res, resolve, reject, passToResolve);
            });
        });
    }
    // get all fields in hash
    getAllFieldsHash(redisKey, passToResolve) {
        return new Promise((resolve, reject) => {
            this.multi.hkeys(redisKey, (err, res) => {
                return this.resolveCb(err, res, resolve, reject, passToResolve);
            });
        });
    }
    ttl() {
        // this.multi.EXPIRE()
    }
    execData() {
        return new Promise((resolve, reject) => {
            this.multi.exec((err, res) => this.resolveCb(err, res, resolve, reject));
        });
    }
    resolveCb(err, response, resolve, reject, argsToResolve) {
        if (response) {
            const toResolve = argsToResolve ? { argsToResolve, response } : response;
            // console.log(toResolve)
            return resolve(toResolve);
        }
        else if (err) {
            console.log('err resolveCB');
            console.log(err);
            return reject(err);
        }
        else {
            console.log('error with no error message');
            return reject('error with no error message');
        }
    }
}
exports.RedisAdapter = RedisAdapter;
//# sourceMappingURL=redisAdapter.js.map