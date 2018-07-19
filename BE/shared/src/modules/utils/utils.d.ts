export declare function retryPromise(promise: () => Promise<any>, timeout?: number, maxTry?: any): Promise<any>;
export declare function callBackIntoPromise(err: any, res: any, resolve: any, reject: any, logService: any, returnObjField?: any, resolveLog?: any, errorLog?: any): any;
export declare function wrapCbInPromise(func: any, args: any, logService: any, returnObjField?: any, resolveLog?: any, errorLog?: any): Promise<{}>;
export declare function wrapInTryCatch(func: any, args: any, logService: any, reject?: any, cb?: any): any;
