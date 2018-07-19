"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = require("./config/appConfig");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const server = http_1.default.createServer(app);
app.use(morgan_1.default("dev"));
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "10mb", extended: true }));
app.set("port", appConfig_1.appConfig.port);
app.get('/test', (req, res) => res.send("okdas "));
server.listen(appConfig_1.appConfig.port, () => {
    console.log(`running fsdfsdon localhost:${appConfig_1.appConfig.port}`);
});
module.exports = {
    server: server,
    app: app
};
//# sourceMappingURL=server.js.map