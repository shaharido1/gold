"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = {
    rabbitPort: process.env.port || "5000",
    redisHost: process.env.domainName || "localhost"
};
