"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producer_1 = require("./producer");
const mockDataGeneretor_1 = require("./mockDataGeneretor/mockDataGeneretor");
const QueueType = 'rabbit'; // 'redis';
const number = 100;
const producer = new producer_1.MockProducer(QueueType, number);
producer.init(3).then(() => {
    producer.generateToQueue(mockDataGeneretor_1.MockDataGenerator.generateMockData());
});
//# sourceMappingURL=server.js.map