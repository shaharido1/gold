"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = {
    // publishToEnrich: process.env.redisChanel || "publishToEnrich",
    // publishToApollo: process.env.redisChanel || "publishToApollo",
    batchNumber: Number(process.env.batchNumber) || 1,
    totalNumberOfRounds: Number(process.env.totalNumberOfRounds) || 1000,
    keyId: "enrich"
};
//# sourceMappingURL=configEnrich.js.map