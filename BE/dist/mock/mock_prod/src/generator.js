"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producer_1 = require("./producer");
class DataGenertor {
    constructor() {
    }
    init() {
        while (true) {
            const a = new producer_1.MockDataGenerator();
            a.generateData();
        }
    }
}
exports.DataGenertor = DataGenertor;
//# sourceMappingURL=generator.js.map