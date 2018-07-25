import { levels, MyLoggerOptions } from './modle/logerOptions';
export declare class LogService {
    log: any;
    error: any;
    constructor(setup: MyLoggerOptions);
    private init;
    loggerWrite(level: levels, msg: string): void;
}
