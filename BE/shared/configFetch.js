"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var ConfigFetch = /** @class */ (function () {
    function ConfigFetch(DefaultConfig, routeName, configServerAddress) {
        this.configServerAddress = {
            host: 'localhost',
            port: '5000'
        };
        this.defaultConfig = this.defaultConfig;
        this.route = routeName;
        this.configServerAddress = configServerAddress || this.configServerAddress;
    }
    ConfigFetch.prototype.init = function () {
        var _this = this;
        return new Promise(resolve, reject);
        {
        }
        node_fetch_1.default(this.configServerAddress.host + ":" + this.configServerAddress.port + "/" + this.route)
            .then(function (res) { return res.json(); })
            .then(function (serverConfig) {
            var env = process.env;
            var filterEnv = env.filter(function (k) {
                return k.indexOf('config_') == 0;
            }).reduce(function (newData, k) {
                newData[k] = env[k];
                return newData;
            }, {});
            _this.finalConfig = __assign({}, _this.defaultConfig, { serverConfig: serverConfig, filterEnv: filterEnv });
        });
        return this.finalConfig;
    };
    return ConfigFetch;
}());
exports.ConfigFetch = ConfigFetch;
