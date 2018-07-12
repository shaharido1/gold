import { PathLike, readFileSync } from 'fs';
import * as path from 'path';
import { ConfigFileLocation } from './configFileLocation';

export enum EnvironementMode {
  'prod' = 'prod',
  'test' = 'test',
  'dev' = 'dev',
  'custom' = 'custom'
}

export class ConfigHandler {
  private environmentVariables: any;
  public finalConfig: any;
  public environmentMode: any;

  constructor(configFileLocation: ConfigFileLocation, configInitial = 'config_') {
    this.environmentVariables = this.getEnvironmentVariables(configInitial);
    const configPath = this.resolveConfigFileLocation(configFileLocation);
    this.getConfig(configPath);
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


  /**
   * This is the config setup location file chosen
   * @param EnvironementMode.custom config file location.
   */

  public resolveConfigFileLocation(configFileLocation) {
    let configPath;
    // todo change to config_env to environment_mode
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
      case EnvironementMode.dev :
      default:
        configPath = path.join(__dirname, configFileLocation.CONFIG_PATH_DEV);
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



