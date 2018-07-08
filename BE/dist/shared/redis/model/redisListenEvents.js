"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RedisListenEvents;
(function (RedisListenEvents) {
    RedisListenEvents["READY"] = "ready";
    RedisListenEvents["MESSAGE"] = "message";
    RedisListenEvents["ERROR"] = "error";
    RedisListenEvents["RECONNECTING"] = "reconnecting";
    RedisListenEvents["CONNECT"] = "connect";
})(RedisListenEvents = exports.RedisListenEvents || (exports.RedisListenEvents = {}));
var RedisConnectionSetup;
(function (RedisConnectionSetup) {
    RedisConnectionSetup["ECONNREFUSED"] = "ECONNREFUSED";
    RedisConnectionSetup[RedisConnectionSetup["TOTAL_RETRY_TIMES"] = 5000] = "TOTAL_RETRY_TIMES";
    RedisConnectionSetup[RedisConnectionSetup["RETRY_TIME"] = 1000] = "RETRY_TIME";
})(RedisConnectionSetup = exports.RedisConnectionSetup || (exports.RedisConnectionSetup = {}));
//# sourceMappingURL=redisListenEvents.js.map