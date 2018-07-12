"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
class LogToBunyan {
    create(config) {
        // config is the object passed to the client constructor.
        const bun = bunyan.createLogger({ name: 'mylogger' });
        this.error = bun.error.bind(bun);
        this.warning = bun.warn.bind(bun);
        this.info = bun.info.bind(bun);
        this.debug = bun.debug.bind(bun);
        this.trace = function (method, requestUrl, body, responseBody, responseStatus) {
            bun.trace({
                method: method,
                requestUrl: requestUrl,
                body: body,
                responseBody: responseBody,
                responseStatus: responseStatus
            });
        };
    }
}
exports.LogToBunyan = LogToBunyan;
//# sourceMappingURL=log_to_bunyan.js.map