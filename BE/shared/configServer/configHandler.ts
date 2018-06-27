import * as fs from 'fs';

import { PathLike } from "fs";

export type SystemConfig = any ;

export class ConfigHandler {
  finalConfig: SystemConfig;

  public getConfig(path: PathLike) : SystemConfig  {
    const configFileObject = this.readConfigFile(path);
    const configFromProcess = this.getFromProcess();
    this.compereObjectToFlat(configFileObject, configFromProcess);
    return this.finalConfig = configFileObject;
  }

  private readConfigFile(path: PathLike): SystemConfig {
    const configString = fs.readFileSync(path, 'utf8');
    return JSON.parse(configString);

  }

  private getFromProcess(): Object {
    const env: Object = process.env;
    const envConfig = {};
    Object.keys(env)
        .filter(key => key.includes('TES', 0))
        .forEach(key => {
          envConfig[key] = env[key];
        });
    return envConfig;
  }

  private compereObjectToFlat(objectToIterate, toCompere) : void {
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



