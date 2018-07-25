import * as http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import { routes } from './routes/routesFunction';
import { DBManager } from './dbModule/connect';
import { dbConfig } from './config/dbConfig';
import { configFileLocation } from './config/mission.config.filePath';
import { GoldServer } from '../../../shared/src/modules/goldServer/goldServer';

export class MissionServer extends GoldServer {

  app = express();
  server = http.createServer(this.app);

  constructor() {
    super(configFileLocation);
    this.configApp();
    this.setupDB().then(() => {
      this.setupRoutes();
      this.setupListener();
    });
  }

  configApp() {
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  }

  setupDB() {
    return DBManager.connect(dbConfig.url, this.logService);
  }

  setupRoutes() {
    routes(this.app, this.logService);
  }

  setupListener() {
    this.server.listen(this.config.port, () => {
      console.log(`running fsdfsdon localhost:${this.config.port}`);
    });
  }

}
