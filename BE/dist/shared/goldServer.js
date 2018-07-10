"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configHandler_1 = require("./configSetup/configHandler");
class GoldServer {
    constructor(str) {
        this.config = new configHandler_1.ConfigHandler(str).finalConfig;
        this.logesHandler();
    }
    logesHandler() {
        // todo finish loggerHandler
        // const loggerSetup = { name: 'producer', path: __dirname };
        // this.loggerHandler = new LoggerHandler(loggerSetup);
        // this.loggerHandler.loggerWrite(levels.TRACE, 'producer starting to work');
    }
}
exports.GoldServer = GoldServer;
//# sourceMappingURL=goldServer.js.map