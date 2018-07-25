import { LogService } from "../logs/logHandler";
export declare class DBManager {
    static connect(Url: any, logService: LogService): Promise<{}>;
    static disconnect(done?: any): void;
}
