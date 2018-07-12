"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockDataGeneretor_1 = require("./mockDataGeneretor/mockDataGeneretor");
const mockProducer_abstract_1 = require("../../../shared/producer/mockProducer/mockProducer.abstract");
class MockProducerDataGenerator extends mockProducer_abstract_1.MockProducer {
    constructor() {
        super();
        this.init();
    }
    init() {
        const obs = mockDataGeneretor_1.MockDataGenerator.generateMockData(65);
        this.generateToQueue(obs);
    }
}
exports.MockProducerDataGenerator = MockProducerDataGenerator;
//# sourceMappingURL=mockProducerDataGeneratorproducer.js.map