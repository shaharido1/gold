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
var axios_1 = require("axios");
var ConfigFetch = /** @class */ (function () {
    function ConfigFetch(DefaultConfig, routeName, configServerAddress) {
        this.configServerAddress = {
            host: '172.30.65.113',
            port: '5000'
        };
        this.defaultConfig = DefaultConfig;
        this.route = routeName;
        this.configServerAddress = configServerAddress || this.configServerAddress;
    }
    ConfigFetch.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('start Fetch');
            // const request: RequestInit = {
            //   method: 'GET'
            //   };
            var url = "http://" + _this.configServerAddress.host + ":" + _this.configServerAddress.port + "/" + _this.route;
            var request = {
                params: { type: 'producer' }
            };
            axios_1.default.get(url, request)
                .then(function (response) {
                // console.log('serverConfig');
                var serverConfig = (response.data);
                var env = process.env;
                var envConfig = {};
                Object.keys(env)
                    .filter(function (key) { return key.includes('TES', 0); })
                    .map(function (key) {
                    envConfig[key] = env[key];
                });
                console.log('!@');
                console.log(_this.defaultConfig);
                console.log(serverConfig);
                console.log(envConfig);
                console.log('!@');
                _this.finalConfig = __assign({}, _this.defaultConfig, { serverConfig: serverConfig, envConfig: envConfig });
                return resolve(_this.finalConfig);
            })
                .catch(function (err) { return console.error(err); });
        });
    };
    return ConfigFetch;
}());
exports.ConfigFetch = ConfigFetch;
