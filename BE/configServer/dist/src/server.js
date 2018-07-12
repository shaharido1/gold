"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configServer_1 = require("../config/configServer");
const configProducer_1 = require("../config/configProducer");
const configConsumer_1 = require("../config/configConsumer");
const configEnrich_1 = require("../config/configEnrich");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = configServer_1.appConfig.config_rabbitPort;
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/test', function (req, res) {
    console.log('WORKS!!!');
    res.send('WORKS!!!');
});
app.get('/getConfig', function (req, res) {
    console.log(req.query.type);
    if (req.query.type === 'producer')
        res.json(configProducer_1.appConfig);
    else if (req.query.type === 'consumer')
        res.json(configConsumer_1.appConfig);
    else if (req.query.type === 'enrich')
        res.json(configEnrich_1.appConfig);
    else
        res.send("404");
});
app.listen(port, () => console.log(`Service Listening on Port ${port}`));
//# sourceMappingURL=server.js.map