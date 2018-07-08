"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
exports.appConfig = {
    config_Port: '5000',
    config_Host: 'localhost'
};
class SharedServices {
    constructor() {
        // this.logService = new LogHandler;
        // this.testHandler = new testHandler;
        // this.configHandler = new ConfigHandler;
    }
    initConnection() {
        return new Promise((resolve, reject) => {
            this.app = express();
            const port = exports.appConfig.config_Port;
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.listen(port, () => {
                return resolve();
            });
        });
    }
    initConfigHandler(path) {
        // return this.configHandler.getConfig(path);
    }
    initHandlers() {
        // return new Promise((resolve, reject) => {
        //   this.configHandler = new ConfigHandler(this.app);
        //   this.configHandler.fetchConfig()
        //   return resolve()
        // });
    }
}
exports.SharedServices = SharedServices;
//# sourceMappingURL=sharedConection.js.map