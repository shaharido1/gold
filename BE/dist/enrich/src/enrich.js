"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../shared/redis/redis");
const configHandler_1 = require("../../shared/configSetup/configHandler");
const measeuerTime_1 = require("../../shared/measureTime/measeuerTime");
const config_enrich_default_1 = require("../config/config.enrich.default");
const redisMQ_worker_1 = require("../../shared/redis/redisMQ-worker");
exports.DEV_ENVIRONMENT = 'goldStarDevelopment';
class Enrich {
    constructor() {
        this.config = new configHandler_1.ConfigHandler(config_enrich_default_1.ConfigFileLocation).finalConfig;
        this.init();
    }
    init() {
        console.log(this.config);
        this.redis = new redis_1.RedisAdapter(this.config.redisConfig);
        this.worker = new redisMQ_worker_1.RedisMQWorkerAdapter(this.config.redisConfig.config_redisQueueName, this.config.redisConfig.config_redisHost);
        this.measureTime = new measeuerTime_1.MeasureTime();
        this.timeSetup = {
            avgTime: 0,
            roundTime: 0,
            totalTime: 0,
            numberOfRounds: 0
        };
        this.redis.initClientConnection()
            .then(() => {
            this.getMessageFromRedis();
            this.worker.start();
        });
    }
    getMessageFromRedis() {
        const redisStartTime = new Date().getTime();
        console.log('enrich started');
        this.worker.on('message', (msg, next, id) => {
            const end = new Date().getTime();
            const parsedData = (JSON.parse(msg));
            if (redisStartTime > parsedData.start) {
                console.log('pass');
                next();
            }
            else {
                this.measureTime.showMeasureTime(end, parsedData.start, this.timeSetup, this.config);
                const newList = this.createNewList(parsedData.message);
                this.redis.sendToQueue(newList, this.config.config_keyId).then(() => {
                    this.worker.del(id);
                    next();
                });
            }
        });
    }
    createNewList(msg) {
        const data = msg;
        const newList = [];
        data.forEach(x => {
            const newData = Object.assign({}, x, { status: 12 });
            newList.push(newData);
        });
        return newList;
    }
}
exports.Enrich = Enrich;
//# sourceMappingURL=enrich.js.map