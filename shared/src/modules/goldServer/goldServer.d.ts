import { LoggerHandler } from '../logHandler/logHendler';
export declare abstract class GoldServer {
    protected config: any;
    protected loggerHandler: LoggerHandler;
    protected constructor(str: any, test?: boolean);
    logesHandler(): void;
}
