import * as bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { ConfigHandler } from './configHandler';
import { Application } from 'express-serve-static-core';

export const appConfig = {
  config_Port: '5000',
  config_Host: 'localhost'
};


export class SharedServices {
  // logService: LogHandler;
  configHandler: ConfigHandler;
  // testHandler: testHandler;
  app: Application;

  constructor() {
    // this.logService = new LogHandler;
    // this.testHandler = new testHandler;
    this.configHandler = new ConfigHandler;
  }


  public initConnection() {
    return new Promise((resolve, reject) => {
      this.app = express();
      const port = appConfig.config_Port;
      this.app.use(cors());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.listen(port, () => {
        return resolve();
      });
    });
  }

  initConfigHandler(path) {
    return this.configHandler.getConfig(path);
  }

  initHandlers() {
    // return new Promise((resolve, reject) => {
    //   this.configHandler = new ConfigHandler(this.app);
    //   this.configHandler.fetchConfig()
    //   return resolve()
    // });
  }

}





