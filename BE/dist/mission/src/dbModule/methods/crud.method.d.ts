import { LogService } from "../../logs/logHandler";
export declare class CrudMethod {
    mongoModel: any;
    logService: LogService;
    constructor(mongoModel: any, logService?: any);
    add(entityToAdd: any): Promise<any>;
    get(entityId: any): Promise<any>;
    getAll(): Promise<any>;
    remove(entityId: any): Promise<any>;
    update(updatedEntity: any): Promise<any>;
    updateField(entityId: any, updatedField: any): Promise<any>;
    removeAll(): Promise<{}>;
}
