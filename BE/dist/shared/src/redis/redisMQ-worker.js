"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RSMQWorker = require("rsmq-worker");
class RedisMQWorkerAdapter {
    constructor(qName, host) {
        console.log('initRMSQ-worker');
        return this.worker = new RSMQWorker(qName, { host, interval: 0 });
    }
}
exports.RedisMQWorkerAdapter = RedisMQWorkerAdapter;
//# sourceMappingURL=redisMQ-worker.js.map