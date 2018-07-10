"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
var EnvironementMode;
(function (EnvironementMode) {
    EnvironementMode["prod"] = "prod";
    EnvironementMode["test"] = "test";
    EnvironementMode["dev"] = "dev";
    EnvironementMode["custom"] = "custom";
})(EnvironementMode = exports.EnvironementMode || (exports.EnvironementMode = {}));
class ConfigHandler {
    constructor(configFileLocation, configInitial = 'config_') {
        this.environmentVariables = this.getEnvironmentVariables(configInitial);
        const configPath = this.resolveConfigFileLocation(configFileLocation);
        this.getConfig(configPath);
    }
    getEnvironmentVariables(configInitial) {
        const env = process.env;
        const envConfig = {};
        Object.keys(env)
            .filter(key => key.includes(configInitial, 0))
            .forEach(key => {
            envConfig[key] = env[key];
        });
        return envConfig;
    }
    /**
     * This is the foo function
     * @param configFileLocation This is the bar parameter
     * @returns returns a string version of bar
     */
    resolveConfigFileLocation(configFileLocation) {
        let configPath;
        // todo change to config_env to environment_mode
        console.log(this.environmentVariables.config_env);
        this.environmentMode = this.environmentVariables.config_env;
        switch (this.environmentMode) {
            case EnvironementMode.prod:
                configPath = configFileLocation.CONFIG_PATH_PROD;
                break;
            case EnvironementMode.test:
                configPath = path.join(__dirname, configFileLocation.CONFIG_PATH_TEST);
                break;
            case EnvironementMode.custom:
                configPath = process.env.configFileLocation;
                break;
            case EnvironementMode.dev:
            default:
                configPath = path.join(__dirname, configFileLocation.CONFIG_PATH_DEV);
        }
        return configPath;
    }
    getConfig(path) {
        const configFileObject = this.readConfigFile(path);
        this.compereObjectToFlat(configFileObject, this.environmentVariables);
        return this.finalConfig = configFileObject;
    }
    readConfigFile(path) {
        const configString = fs_1.readFileSync(path, 'utf8');
        return JSON.parse(configString);
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