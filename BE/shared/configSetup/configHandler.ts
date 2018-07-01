import { PathLike, readFileSync } from 'fs';
import * as path from 'path';


export class ConfigHandler {
  public finalConfig: any;
  public environmentVariables: any;

  constructor(ConfigFileLocation, configInitial = 'config_') {
    this.environmentVariables = this.getEnvironmentVariables(configInitial);
    const configPath = this.resolveConfigFileLocation(ConfigFileLocation);
    this.getConfig(configPath)
  }

  private getEnvironmentVariables(configInitial): any {
    const env: Object = process.env;
    const envConfig = {};
    Object.keys(env)
        .filter(key => key.includes(configInitial, 0))
        .forEach(key => {
          envConfig[key] = env[key];
        });
    return envConfig;
  }

  private resolveConfigFileLocation(ConfigFileLocation) {
    let configPath;
    // todo change to environment_mode
    const env = this.environmentVariables.config_env;
    switch (env) {
      case 'prod':
        configPath = ConfigFileLocation.CONFIG_PATH_PROD;
        break;
      case 'test':
        configPath = path.join(__dirname, ConfigFileLocation.CONFIG_PATH_TEST);
        break;
      case 'custom':
        configPath = process.env.configFileLocation;
        break;
      default: configPath = path.join(__dirname, ConfigFileLocation.CONFIG_PATH_DEV);
    }
    return configPath;

  }

  private getConfig(path: PathLike): any {
    const configFileObject = this.readConfigFile(path);
    this.compereObjectToFlat(configFileObject, this.environmentVariables);
    return this.finalConfig = configFileObject;
  }

  private readConfigFile(path: PathLike): any {
    const configString = readFileSync(path, 'utf8');
    return JSON.parse(configString);
  }


  private compereObjectToFlat(objectToIterate, toCompere): void {
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



