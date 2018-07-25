"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const goldServer_1 = require("../../../shared/src/modules/goldServer/goldServer");
const mockDataGeneretor_1 = require("./mockDataGeneretor/mockDataGeneretor");
const config_filePath_1 = require("../config/config.filePath");
const producer_1 = require("../../../shared/src/modules/producer/producer");
const rabbitConnectionManager_1 = require("../../../shared/src/modules/rabbit/rabbitConnectionManager");
class DataGenerator extends goldServer_1.GoldServer {
    constructor() {
        super(config_filePath_1.configFileLocation);
        this.init();
    }
    init() {
        this.mockDataGen = new mockDataGeneretor_1.MockDataGenerator();
        this.connectionManager = new rabbitConnectionManager_1.RabbitConnectionManager(this.config.rabbitConfig);
        this.producer = new producer_1.Producer(this.config.rabbitConfig, this.connectionManager);
        this.producer.listener.subscribe(event => {
            if (event = 'ready' || 'recover')
                this.sendSourceToQueue();
        });
    }
    sendSourceToQueue() {
        this.source = this.mockDataGen.generateMockData(Infinity, 10);
        this.producer.generateToQueue(this.source, this.config.rabbitConfig.config_rabbitQueueName, this.config.rabbitConfig.config_queueOptions)
            .catch(() => {
            this.mockDataGen.killSourceMockData();
            this.sendSourceToQueue();
        });
    }
}
exports.DataGenerator = DataGenerator;
//# sourceMappingURL=dataGenertorgenerator.js.map