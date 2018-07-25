"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const missionTemplate = mongoose.Schema({
    name: String,
});
exports.Mission = mongoose.model("mission", missionTemplate);
//# sourceMappingURL=mission.schema.js.map