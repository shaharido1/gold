"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const uuidv4 = require('uuid/v4');
const rabbit_1 = require("../../../shared/rabbit");
const configHandler_1 = require("../../../shared/src/modules/configSetup/configHandler");
class Producer {
    constructor() {
        const LocalPath = '../../../../src/config/config.json';
        const configLocation = this.isDevelopment() ?
            LocalPath : process.env.configLocation || './src/config/config.json';
        const configPatch = path.join(__dirname, configLocation);
        const configHandler = new configHandler_1.ConfigHandler();
        this.config = configHandler.getConfig(configPatch);
        this.rabbitAdapter = new rabbit_1.RabbitAdapter(this.config.rabbitConfig);
    }
    isDevelopment() {
        return Object.keys(process.argv).some(key => process.argv[key] === "goldStarDevelopment");
    }
    init() {
        this.rabbitAdapter.initConnection().then(({ channel }) => {
            setInterval(() => {
                const batch = this.createBatch(this.config.config_batchNumber);
                const stringifyBatch = Producer.stringifyMessage(batch);
                this.rabbitAdapter.sendToQueue(stringifyBatch);
            }, this.config.config_batchNumber / 10);
        });
    }
    createBatch(batchNumber) {
        let i = 0;
        const mockData = [];
        while (i < batchNumber) {
            const id = uuidv4();
            const msg = { massage: `ms-${i}`, id: `${id}` };
            mockData.push(msg);
            i++;
        }
        return mockData;
    }
    static stringifyMessage(message) {
        const js = {
            message,
            rabbitStart: new Date().getTime()
        };
        const batch = JSON.stringify(js);
        /* const stringIfyBatch = `{"message":${JSON.stringify(message)} ,"rabbitStart":${new Date().getTime()}}`;*/
        return batch;
    }
}
exports.Producer = Producer;
//# sourceMappingURL=producer.js.map