"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockProducer_1 = require("../../../shared/producer/mockProducer/mockProducer");
class MockProducerDataGenerator extends mockProducer_1.MockProducer {
    constructor() {
        super();
    }
    init() {
        Moc;
    }
    generateData() {
        const data = 's';
        return data;
    }
}
exports.MockProducerDataGenerator = MockProducerDataGenerator;
//# sourceMappingURL=producer.js.map