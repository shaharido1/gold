"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configServer_1 = require("../../shared/config/configServer");
const configProducer_1 = require("../../shared/config/configProducer");
const configConsumer_1 = require("../../shared/config/configConsumer");
const configEnrich_1 = require("../../shared/config/configEnrich");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = configServer_1.appConfig.rabbitPort;
app.set('port', port);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/test', function (req, res) {
    console.log('WORKS!!!');
    res.send('WORKS!!!');
});
app.get('/prod', function (req, res) {
    res.json(configProducer_1.appConfig);
});
app.get('/consumer', function (req, res) {
    res.json(configConsumer_1.appConfig);
});
app.get('/enrich', function (req, res) {
    res.json(configEnrich_1.appConfig);
});
app.listen(port, () => console.log(`Service Listening on Port ${port}`));
//# sourceMappingURL=server.js.map