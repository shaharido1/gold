"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitChannel_1 = require("./rabbitChannel");
class RabbitProducer extends rabbitChannel_1.RabbitChannel {
    sendToQueue(data, queueName = this.config.config_rabbitQueueName, options = this.config.config_queueOptions) {
        try {
            this.rabbitChannel.sendToQueue(queueName, new Buffer(data), options);
            console.log('send to Q');
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.RabbitProducer = RabbitProducer;
//# sourceMappingURL=rabbitProducer.js.map