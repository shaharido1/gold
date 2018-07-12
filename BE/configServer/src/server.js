"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appConfig_1 = require("../../config/appConfig");
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var app = express_1.default();
var port = appConfig_1.appConfig.rabbitPort;
app.set('port', port);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.listen(port, function () { return console.log("config server runing on port " + port); });
