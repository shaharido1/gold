"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbit_1 = require("../../shared/rabbit/rabbit");
const redisMQ_1 = require("../../shared/redis/redisMQ");
const configHandler_1 = require("../../shared/configSetup/configHandler");
const measeuerTime_1 = require("../../shared/measureTime/measeuerTime");
const config_filePath_1 = require("../config/config.filePath");
class Consumer {
    constructor() {
        this.timeSetup = {
            avgTime: 0,
            numberOfRounds: 0,
            roundTime: 0,
            totalTime: 0
        };
        this.measureTime = new measeuerTime_1.MeasureTime();
        this.config = new configHandler_1.ConfigHandler(config_filePath_1.ConfigFileLocation).finalConfig;
        this.rabbitAdapter = new rabbit_1.RabbitAdapter(this.config.rabbitConfig);
        this.redisAdapter = new redisMQ_1.RedisMqAdapter(this.config.redisConfig);
        this.init();
    }
    init() {
        Promise.all([this.redisAdapter.initRMSQ(), this.rabbitAdapter.initConnection()]).then((connections) => {
            this.rabbitStartTime = new Date().getTime();
            this.rabbitAdapter.consumeFromQueue().then(this.doStuff.bind(this));
        }).catch(err => err);
    }
    doStuff(data) {
        const rabbitEnd = new Date().getTime();
        const rawData = data.content.toString();
        const parsedData = JSON.parse(rawData);
        if (this.rabbitStartTime > parsedData.rabbitStart) {
            console.log('pass');
        }
        else {
            this.measureTime.showMeasureTime(rabbitEnd, parsedData.rabbitStart, this.timeSetup, this.config);
            const messageWithTime = this.measureTime.timeWrapper(parsedData.message);
            this.redisAdapter.sendMassage(messageWithTime, this.timeSetup, this.config.config_totalNumberOfRounds);
            this.redisAdapter.sendToQueue(parsedData.message, this.config.config_keyId).then();
        }
    }
}
exports.Consumer = Consumer;
//# sourceMappingURL=consumer.js.map