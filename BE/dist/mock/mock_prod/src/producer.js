"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbit_1 = require("../../../shared/rabbit/rabbit");
const configHandler_1 = require("../../../shared/configSetup/configHandler");
const config_filePath_1 = require("../config/config.filePath");
const redis_1 = require("../../../shared/redis/redis");
const Qtypes_1 = require("./model/Qtypes");
class MockProducer {
    constructor(QueueType, timeToRepeat) {
        this.config = new configHandler_1.ConfigHandler(config_filePath_1.configFileLocation).finalConfig;
        this.queueTypeTest(QueueType);
        this.logesHandler();
        this.init(timeToRepeat);
    }
    queueTypeTest(QueueType) {
        if (QueueType === Qtypes_1.QueueTipe.rabbit) {
            this.QType = Qtypes_1.QueueTipe.rabbit;
            this.rabbitAdapter = new rabbit_1.RabbitAdapter(this.config.rabbitConfig);
        }
        else if (QueueType === Qtypes_1.QueueTipe.redis) {
            this.QType = Qtypes_1.QueueTipe.redis;
            this.redisAdapter = new redis_1.RedisAdapter(this.config.redisConfig);
        }
    }
    logesHandler() {
        // todo finish loggerHandler
        // const loggerSetup = { name: 'producer', path: __dirname };
        // this.loggerHandler = new LoggerHandler(loggerSetup);
        // this.loggerHandler.loggerWrite(levels.TRACE, 'producer starting to work');
    }
    init(timeToRepeat) {
        return this.rabbitAdapter.initConnection();
    }
    generateToQueue(obs) {
        obs.subscribe(data => {
            this.rabbitAdapter.sendToQueue(data);
        });
    }
}
exports.MockProducer = MockProducer;
//# sourceMappingURL=producer.js.map