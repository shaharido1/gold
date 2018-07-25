"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const goldServer_1 = require("../../shared/src/modules/goldServer/goldServer");
const consumer_1 = require("../../shared/src/modules/consumer/consumer");
const rabbitConnectionManager_1 = require("../../shared/src/modules/rabbit/rabbitConnectionManager");
const config_filePath_1 = require("../config/config.filePath");
class ValidateNRepack extends goldServer_1.GoldServer {
    constructor() {
        super(config_filePath_1.configFileLocation);
        this.init();
    }
    init() {
        this.connectionManager = new rabbitConnectionManager_1.RabbitConnectionManager(this.config.rabbitConfig);
        this.consumer = new consumer_1.Consumer(this.config.rabbitConfig, this.connectionManager);
        this.consumer.init()
            .then(() => {
            this.consumer.consumeFromQueue(this.doStuff);
        })
            .catch((err) => console.log(err));
        // this.connectionManager.assertConnection().then(connection => {
        //   this.connection = connection;
        //   this.consumer.consumeFromQueue(this.doStuff);
        // });
    }
    doStuff(msg) {
        return new Promise((resolve, reject) => {
            console.log(msg.content.toString());
            return resolve();
        });
    }
}
exports.ValidateNRepack = ValidateNRepack;
//# sourceMappingURL=validateNRepack.js.map