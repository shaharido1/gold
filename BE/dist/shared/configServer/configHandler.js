"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class ConfigHandler {
    constructor(path, configInitial = 'config_') {
        this.getConfig(path, configInitial);
    }
    getConfig(path, configInitial) {
        const configFileObject = this.readConfigFile(path);
        const configFromProcess = this.getFromProcess(configInitial);
        this.compereObjectToFlat(configFileObject, configFromProcess);
        return this.finalConfig = configFileObject;
    }
    readConfigFile(path) {
        const configString = fs_1.readFileSync(path, 'utf8');
        return JSON.parse(configString);
    }
    getFromProcess(configInitial) {
        const env = process.env;
        const envConfig = {};
        Object.keys(env)
            .filter(key => key.includes(configInitial, 0))
            .forEach(key => {
            envConfig[key] = env[key];
        });
        return envConfig;
    }
    compereObjectToFlat(objectToIterate, toCompere) {
        function iterateRecursive(object) {
            Object.keys(object)
                .forEach(key => {
                const value = object[key];
                if (typeof value === 'object') {
                    iterateRecursive(value);
                }
                else {
                    object[key] = toCompere[key] || value;
                }
            });
        }
        iterateRecursive(objectToIterate);
    }
}
exports.ConfigHandler = ConfigHandler;
//# sourceMappingURL=configHandler.js.map