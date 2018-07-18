import { LogService } from '../logHandler/logHendler';
export declare abstract class GoldServer {
    protected config: any;
    logService: LogService;
    protected constructor(str: any, test?: boolean);
    logesHandler(): void;
}
