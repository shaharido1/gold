"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wrapper object for ENV var config values (with defaults)
 * @type {Object}
 */
const Config = {
    serverPort: process.env.SERVER_PORT || 5222,
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379
};
exports.default = Config;
//# sourceMappingURL=config.js.map