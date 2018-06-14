"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("./redis");
var rsmq_promise_1 = require("rsmq-promise");
var RedisMqAdapter = /** @class */ (function (_super) {
    __extends(RedisMqAdapter, _super);
    function RedisMqAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedisMqAdapter.prototype.initRMSQ = function (qname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _super.prototype.initClientConnection.call(_this)
                .then(function (client) {
                _this.client = client;
                _this.rsmq = new rsmq_promise_1.default(client);
                _this.assertQueue(qname).then(function () { return resolve(); });
            })
                .catch(function (err) {
                console.log(err);
                return reject(err);
            });
        });
    };
    RedisMqAdapter.prototype.assertQueue = function (qname) {
        var _this = this;
        return new Promise(function (reoslve, reject) {
            _this.rsmq.createQueue({ qname: qname })
                .then(function () { return reoslve(); })
                .catch(function (err) {
                if (err === '.... queue exist') {
                    return reoslve();
                }
                else {
                    return reject();
                }
            });
        });
    };
    RedisMqAdapter.prototype.sendMessage = function () {
        return;
    };
    return RedisMqAdapter;
}(redis_1.RedisAdapter));
exports.RedisMqAdapter = RedisMqAdapter;
