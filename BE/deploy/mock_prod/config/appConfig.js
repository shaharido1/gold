"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = {
    rabbitPort: process.env.port || '5672',
    rabbitHost: process.env.rabbitHost || 'localhost',
    batchNumber: Number(process.env.batchNumber) || 1,
};
//# sourceMappingURL=appConfig.js.map