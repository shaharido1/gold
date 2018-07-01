"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors_1 = require("cors");
var configHandler_1 = require("./configHandler");
exports.appConfig = {
    config_rabbitPort: "5000",
    config_redisHost: "172.30.65.113"
};
var SharedServices = /** @class */ (function () {
    // testHandler: testHandler;
    function SharedServices() {
        var app = express();
        var port = exports.appConfig.config_rabbitPort;
        app.use(cors_1.default());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        // this.logService = new LogHandler;
        this.configHandler = new configHandler_1.ConfigHandler(app);
        // this.testHandler = new testHandler;
    }
    SharedServices.prototype.initConnection = function () {
        // express
    };
    return SharedServices;
}());
exports.SharedServices = SharedServices;
