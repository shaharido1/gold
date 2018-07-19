import { levels, MyLoggerOptions } from './modle/logerOptions';
export declare class LoggerHandler {
    log: any;
    sendToElastic: any;
    constructor(setup: MyLoggerOptions);
    private init;
    loggerWrite(level: levels, msg: string): void;
}
