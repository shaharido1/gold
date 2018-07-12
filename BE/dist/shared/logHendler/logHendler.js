"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const logerOptions_1 = require("./modle/logerOptions");
var leve;
(function (leve) {
    leve["TRACE"] = "trace";
})(leve = exports.leve || (exports.leve = {}));
class LoggerHandler {
    constructor(setup) {
        this.init(setup);
    }
    init(setup) {
        const loggerSetup = {
            name: setup.name,
            streams: [{
                    path: `${setup.path}/play.log`
                }]
        };
        this.log = bunyan.createLogger(loggerSetup);
    }
    loggerWrite(level, msg) {
        switch (level) {
            case logerOptions_1.levels.TRACE:
                this.log.trace(msg);
                break;
            case logerOptions_1.levels.DEBUG:
                this.log.debug(msg);
                break;
            case logerOptions_1.levels.WARN:
                this.log.warn(msg);
                break;
            case logerOptions_1.levels.ERROR:
                this.log.error(msg);
                break;
            case logerOptions_1.levels.FATAL:
                this.log.fatal(msg);
                break;
            default:
                this.log.info(msg);
        }
    }
}
exports.LoggerHandler = LoggerHandler;
//# sourceMappingURL=logHendler.js.map