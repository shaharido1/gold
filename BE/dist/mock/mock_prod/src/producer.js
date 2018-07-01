"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbit_1 = require("../../../shared/rabbit/rabbit");
const mockDataGeneretor_1 = require("./mockDataGeneretor/mockDataGeneretor");
const configHandler_1 = require("../../../shared/configSetup/configHandler");
const config_filePath_1 = require("../config/config.filePath");
class Producer {
    constructor() {
        this.config = new configHandler_1.ConfigHandler(config_filePath_1.ConfigFileLocation).finalConfig;
        this.rabbitAdapter = new rabbit_1.RabbitAdapter(this.config.rabbitConfig);
        this.init();
    }
    init() {
        this.rabbitAdapter.initConnection().then(() => {
            setInterval(() => {
                const batch = mockDataGeneretor_1.MockDataGeneretor.createBatch(this.config.config_batchNumber);
                this.rabbitAdapter.sendToQueue(batch);
            }, this.config.config_batchNumber / 10);
        });
    }
}
exports.Producer = Producer;
//# sourceMappingURL=producer.js.map