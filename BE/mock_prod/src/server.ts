import { appConfig } from "./config/appConfig";

import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";


const app = express();
const server = http.createServer(app);

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.set("port", appConfig.port);

app.get('/test', (req, res) => res.send("okdas "))

server.listen(appConfig.port, () => {

  console.log(`running fsdfsdon localhost:${appConfig.port}`);

});


module.exports = {
  server: server,
  app: app
};

