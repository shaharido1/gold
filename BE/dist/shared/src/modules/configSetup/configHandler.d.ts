import { ConfigFileLocation } from './configFileLocation';
export declare enum EnvironementMode {
    'prod' = "prod",
    'test' = "test",
    'dev' = "dev",
    'custom' = "custom",
}
export declare class ConfigHandler {
    private environmentVariables;
    finalConfig: any;
    environmentMode: any;
    constructor(configFileLocation: ConfigFileLocation, configInitial?: string);
    private getEnvironmentVariables(configInitial);
    /**
     * This is the config setup location file chosen
     * @param EnvironementMode.custom config file location.
     */
    resolveConfigFileLocation(configFileLocation: any): any;
    private getConfig(path);
    private readConfigFile(path);
    private compereObjectToFlat(objectToIterate, toCompere);
}
