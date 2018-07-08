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
const redisMQ_1 = require("../../shared/redis/redisMQ");
const configHandler_1 = require("../../shared/configSetup/configHandler");
const measeuerTime_1 = require("../../shared/measureTime/measeuerTime");
const config_filePath_1 = require("../config/config.filePath");
const rabbitConsumer_1 = require("../../shared/rabbit/rabbitConsumer");
class Consumer {
    constructor() {
        this.timeSetup = {
            avgTime: 0,
            numberOfRounds: 0,
            roundTime: 0,
            totalTime: 0
        };
        this.measureTime = new measeuerTime_1.MeasureTime();
        this.subscriptions = [];
        this.config = new configHandler_1.ConfigHandler(config_filePath_1.configFileLocation).finalConfig;
        this.rabbitConsumer = new rabbitConsumer_1.RabbitConsumer(this.config.rabbitConfig);
        this.redisAdapter = new redisMQ_1.RedisMqAdapter(this.config.redisConfig);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.all([this.redisAdapter.initRMSQ(), this.rabbitConsumer.getChannel()]).then(() => {
                this.rabbitStartTime = new Date().getTime();
                const subscription = this.rabbitConsumer.clientConsume()
                    .subscribe(message => {
                    this.doStuff(message)
                        .then(() => {
                        try {
                            console.log('ack');
                            this.rabbitConsumer.ack(message);
                        }
                        catch (e) {
                            console.log('failed ack');
                            console.log(e);
                        }
                    })
                        .catch((e) => {
                        console.log(e);
                        console.log('canceling..');
                        this.rabbitConsumer.cancel(message);
                    });
                }, err => console.log(err));
                this.subscriptions.push(subscription);
            }).catch(err => Error(err));
        });
    }
    doStuff(msg) {
        return new Promise((resolve, reject) => {
            //   return resolve();
            // })
            const rabbitEnd = new Date().getTime();
            const rawData = msg.content.toString();
            const parsedData = JSON.parse(rawData);
            if (this.rabbitStartTime > parsedData.rabbitStart) {
                console.log('pass');
                return resolve(msg);
            }
            else {
                this.measureTime.showMeasureTime(rabbitEnd, parsedData.rabbitStart, this.timeSetup, this.config);
                const messageWithTime = this.measureTime.timeWrapper(parsedData.message);
                const timeToWightToRedis = new Date().getTime();
                console.log(messageWithTime);
                this.redisAdapter.sendMassage(messageWithTime)
                    .then(() => {
                    if (this.timeSetup.numberOfRounds % this.config.config_totalNumberOfRounds == 0) {
                        console.log(`Time to write to redis: ${(new Date().getTime() - timeToWightToRedis) * 0.001} sec\n`);
                    }
                    return resolve(msg);
                }).catch(err => {
                    console.log(err);
                    // todo error log handling etc....
                    return reject(msg);
                });
            }
        });
    }
}
exports.Consumer = Consumer;
//# sourceMappingURL=consumer.js.map