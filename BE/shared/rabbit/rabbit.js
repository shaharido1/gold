"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var callback_api_1 = require("amqplib/callback_api");
var Rabbit = /** @class */ (function () {
    function Rabbit(rabbitAddress) {
        this.rabbitAddress = rabbitAddress || {
            host: process.env.rabbitHost || "10.0.75.1",
            port: process.env.rabbitPort || "5672"
        };
    }
    Rabbit.prototype.initConnection = function (queue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.intervalConnection().then(function () {
                _this.createChannel().then(function () {
                    _this.assertQueue(queue).then(function (ok) {
                        return resolve({ ok: ok, channel: _this.rabbitChannel });
                    });
                });
            }).catch(function () { return reject("failed to connect"); });
        });
    };
    Rabbit.prototype.intervalConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tryToConnect = setInterval(function () {
                _this.connect()
                    .then(function (connection) {
                    clearInterval(tryToConnect);
                    return resolve(connection);
                })
                    .catch(function (err) { return err; });
            }, 10000);
        });
    };
    Rabbit.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("trying to connect to " + ("amqp://guest:guest@" + _this.rabbitAddress.host + ":" + _this.rabbitAddress.port));
            callback_api_1.default.connect("amqp://guest:guest@" + _this.rabbitAddress.host + ":" + _this.rabbitAddress.port, function (err, conn) {
                if (conn) {
                    console.log("connected to rabbit!");
                    _this.rabbitConnection = conn;
                    return resolve(conn);
                }
                else if (err) {
                    console.log("fail to connect");
                    console.log(err);
                    return reject();
                }
            });
        });
    };
    Rabbit.prototype.createChannel = function (connection) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conn = connection || _this.rabbitConnection;
            conn.createChannel(function (err, channel) {
                if (channel) {
                    _this.rabbitChannel = channel;
                    return resolve(channel);
                }
                else if (err) {
                    console.log("fail to connect");
                    console.log(err);
                    return reject();
                }
            });
        });
    };
    Rabbit.prototype.assertQueue = function (queue, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rabbitChannel.assertQueue(queue, options, function (err, ok) {
                if (ok) {
                    return resolve(ok);
                }
                else if (err) {
                    console.log(err);
                    return reject();
                }
            });
        });
    };
    return Rabbit;
}());
exports.Rabbit = Rabbit;
