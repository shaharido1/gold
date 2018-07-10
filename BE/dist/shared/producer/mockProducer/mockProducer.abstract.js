"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producer_abstract_1 = require("../producer.abstract");
class MockProducer extends producer_abstract_1.Producer {
    generateToQueue(obs) {
        obs.subscribe(data => {
            this.rabbitProducer.sendToQueue(data);
        });
    }
}
exports.MockProducer = MockProducer;
//# sourceMappingURL=mockProducer.abstract.js.map