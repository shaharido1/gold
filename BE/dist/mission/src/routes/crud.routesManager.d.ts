import { CrudMethod } from "../dbModule/methods/crud.method";
import { LogService } from "../logs/logHandler";
export declare class CrudRoutesManager {
    crudMethods: CrudMethod;
    logService: LogService;
    entityName: string;
    constructor(entityMethods: any, entityName: any, logService: any);
    test(req: any, res: any): any;
    getById(req: any, res: any): void;
    add(req: any, res: any): void;
    getAll(req: any, res: any): void;
    update(req: any, res: any): void;
    updateField(req: any, res: any): void;
    remove(req: any, res: any): void;
}
