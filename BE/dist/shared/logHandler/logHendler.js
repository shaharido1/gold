"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const logerOptions_1 = require("./modle/logerOptions");
const elasticsearch = require("elasticsearch");
class LoggerHandler {
    constructor(setup) {
        this.init(setup);
    }
    init(setup) {
        const loggerSetup = {
            name: setup.name,
            // level: "trace",
            streams: [{
                    type: 'rotating-file',
                    level: 0,
                    path: `${setup.path}/logs.json`
                }
            ]
        };
        this.log = bunyan.createLogger(loggerSetup);
        const client = new elasticsearch.Client({
            host: 'localhost:9200',
            log: [
                {
                    path: `${setup.path}/logs.json`,
                    level: 'trace'
                }
            ]
        });
    }
    loggerWrite(level, msg) {
        console.log(`level: ${level}`);
        switch (level) {
            case logerOptions_1.levels.TRACE:
                console.log('TRACE');
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