"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routesFunction_1 = require("./routes/routesFunction");
const appConfig_1 = require("./config/appConfig");
const express_1 = require("express");
const http_1 = require("http");
const morgan_1 = require("morgan");
const body_parser_1 = require("body-parser");
const logHandler_1 = require("./logs/logHandler");
const connect_1 = require("./dbModule/connect");
const dbConfig_1 = require("./config/dbConfig");
const app = express_1.default();
const server = http_1.default.createServer(app);
app.use(morgan_1.default("dev"));
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "10mb", extended: true }));
const logService = new logHandler_1.LogService();
connect_1.DBManager.connect(dbConfig_1.dbConfig.url, logService);
app.set("port", appConfig_1.appConfig.rabbitPort);
routesFunction_1.routes(app);
server.listen(appConfig_1.appConfig.rabbitPort, () => {
    console.log(`running fsdfsdon localhost:${appConfig_1.appConfig.rabbitPort}`);
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
//# sourceMappingURL=server.js.map