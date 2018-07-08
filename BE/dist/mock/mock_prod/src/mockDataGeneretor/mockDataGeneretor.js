"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const index_1 = require("rxjs/index");
class MockDataGenerator {
    constructor() {
        this.repeated = 0;
    }
    static createBatch(batchNumber) {
        let i = 0;
        const mockData = [];
        while (i < batchNumber) {
            const msg = { message: `ms-${i}`, id: uuid_1.v4() };
            mockData.push(msg);
            i++;
        }
        return MockDataGenerator.stringifyMessage(mockData);
    }
    static stringifyMessage(message) {
        const js = {
            message,
            rabbitStart: new Date().getTime()
        };
        return JSON.stringify(js);
    }
    static generateMockData(timeToRepeat) {
        return new index_1.Observable(observer => {
            const interval = setInterval(() => {
                if (++this.repeated === timeToRepeat) {
                    clearInterval(interval);
                }
                const batch = MockDataGenerator.createBatch(this.config.config_batchNumber);
                console.log(batch);
                observer.next(batch);
                // }, this.config.config_batchNumber / 10);
            }, 2000);
        });
    }
}
exports.MockDataGenerator = MockDataGenerator;
//# sourceMappingURL=mockDataGeneretor.js.map