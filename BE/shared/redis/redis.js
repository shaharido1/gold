"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("redis");
var RedisAdapter = /** @class */ (function () {
    function RedisAdapter() {
    }
    RedisAdapter.prototype.initConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tryToConnect = setInterval(function () {
                _this.redisConnect()
                    .then(function () {
                    clearInterval(tryToConnect);
                    _this.multi = _this.client.multi();
                    console.log("initREDIS");
                    return resolve(_this.client);
                })
                    .catch(function (err) { return err; });
            }, 2000);
        });
    };
    RedisAdapter.prototype.redisConnect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client = redis_1.default.createClient({ host: "localhost" });
            // this.client = redis.createClient({ host: "redis" });
            _this.client.on("ready", function () {
                return resolve();
            });
            _this.client.on("error", function (err) {
                console.log(err);
                return reject();
            });
        });
    };
    RedisAdapter.prototype.saveInRedis = function (list, key) {
        var _this = this;
        list.forEach(function (data) {
            console.log(data);
            _this.multi
                .hmset(key + ":" + data.id, "massage", data, function (err, res) {
                console.log("redis:" + res);
                if (err) {
                    console.error(err);
                }
            })
                .exec();
        });
    };
    return RedisAdapter;
}());
exports.RedisAdapter = RedisAdapter;
