"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RedisDataType;
(function (RedisDataType) {
    RedisDataType["mission"] = "M";
    RedisDataType["interception"] = "I";
    RedisDataType["sensor"] = "S";
})(RedisDataType = exports.RedisDataType || (exports.RedisDataType = {}));
var RedisInterceptionCoreFields;
(function (RedisInterceptionCoreFields) {
    RedisInterceptionCoreFields["static"] = "static";
    RedisInterceptionCoreFields["dynamic"] = "dynamic";
})(RedisInterceptionCoreFields = exports.RedisInterceptionCoreFields || (exports.RedisInterceptionCoreFields = {}));
var RedisInterceptionMissionRelatedFields;
(function (RedisInterceptionMissionRelatedFields) {
    RedisInterceptionMissionRelatedFields["related_missions"] = "related_missions";
    RedisInterceptionMissionRelatedFields["rank"] = "rank";
    RedisInterceptionMissionRelatedFields["tags"] = "tags";
})(RedisInterceptionMissionRelatedFields = exports.RedisInterceptionMissionRelatedFields || (exports.RedisInterceptionMissionRelatedFields = {}));
//# sourceMappingURL=dbInterface.js.map