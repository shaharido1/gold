import { routes } from "./routes/routesFunction";
import { appConfig } from "./config/appConfig";

import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import { LogService } from "./logs/logHandler";
import { DBManager } from "./dbModule/connect";
import { dbConfig } from "./config/dbConfig";

const app = express();
const server = http.createServer(app);

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
const logService = new LogService();
DBManager.connect(dbConfig.url, logService);
app.set("port", appConfig.rabbitPort);
routes(app);

server.listen(appConfig.rabbitPort, () => {

  console.log(`running fsdfsdon localhost:${appConfig.rabbitPort}`);

});
function stop() {
  server.close();
}

module.exports = {
  stop,
  logService,
  server: server,
  app: app
};

