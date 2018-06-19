import fetch from 'node-fetch';
import { Address } from './interfaces/path';

export class ConfigFetch {

  route: string;
  configServerAddress: Address = {
    host: 'localhost',
    port: '5000'
  };
  defaultConfig;
  finalConfig;


  constructor(DefaultConfig, routeName, configServerAddress?) {
    this.defaultConfig = this.defaultConfig;
    this.route = routeName;
    this.configServerAddress = configServerAddress || this.configServerAddress;
  }

  init():  Promise <Object> {
    return new Promise(resolve,reject)=>{

    })

    fetch(`${this.configServerAddress.host}:${this.configServerAddress.port}/${this.route}`)
        .then(res => res.json())
        .then(serverConfig => {
          const env: object = process.env;
          const filterEnv : object = env.filter((k) => {
            return k.indexOf('config_') == 0;
          }).reduce((newData, k) => {
            newData[k] = env[k];
            return newData;
          }, {});

          this.finalConfig = { ...this.defaultConfig, serverConfig, filterEnv};
        });
    return this.finalConfig
  }

}