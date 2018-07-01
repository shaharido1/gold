"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class MockDataGeneretor {
    static createBatch(batchNumber) {
        let i = 0;
        const mockData = [];
        while (i < batchNumber) {
            const msg = { message: `ms-${i}`, id: uuid_1.v4() };
            mockData.push(msg);
            i++;
        }
        return MockDataGeneretor.stringifyMessage(mockData);
    }
    static stringifyMessage(message) {
        const js = {
            message,
            rabbitStart: new Date().getTime()
        };
        return JSON.stringify(js);
    }
}
exports.MockDataGeneretor = MockDataGeneretor;
//# sourceMappingURL=mockDataGeneretor.js.map