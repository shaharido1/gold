"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
class ConfigHandler {
    constructor(configFileLocation, configInitial = 'config_', testMode) {
        this.environmentVariables = this.getEnvironmentVariables(configInitial);
        const configPath = this.resolveConfigFileLocation(configFileLocation, testMode);
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
    resolveConfigFileLocation(configFileLocation, testMode) {
        let configPath;
        // todo change to environment_mode
        if (testMode) {
            this.environmentMode = 'test';
        }
        else {
            this.environmentMode = this.environmentVariables.config_env;
        }
        switch (this.environmentMode) {
            case 'prod':
                configPath = configFileLocation.CONFIG_PATH_PROD;
                break;
            case 'test':
                configPath = path.join(__dirname, configFileLocation.CONFIG_PATH_TEST);
                break;
            case 'custom':
                configPath = process.env.configFileLocation;
                break;
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