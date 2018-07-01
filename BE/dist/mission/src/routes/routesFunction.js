"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("./paths");
const missionRoutesManager_1 = require("./missionRoutesManager");
const mission_method_1 = require("../dbModule/methods/mission.method");
const mission_schema_1 = require("../dbModule/schemas/mission.schema");
const { logService } = require("../server");
const missionMethods = new mission_method_1.MissionMethods(mission_schema_1.Mission, logService);
const missionRoutesManager = new missionRoutesManager_1.MissionRoutesManager(missionMethods, "mission", logService);
function routes(app) {
    app.get(paths_1.paths.test, (req, res) => missionRoutesManager.test(req, res));
    app.post(paths_1.paths.getMissionById, (req, res) => missionRoutesManager.getById(req, res));
    app.get(paths_1.paths.getAllMission, (req, res) => missionRoutesManager.getAll(req, res));
    app.get(paths_1.paths.addMission, (req, res) => missionRoutesManager.add(req, res));
    app.get(paths_1.paths.updateMission, (req, res) => missionRoutesManager.update(req, res));
    app.get(paths_1.paths.updateMissionField, (req, res) => missionRoutesManager.updateField(req, res));
    app.get(paths_1.paths.removeMission, (req, res) => missionRoutesManager.remove(req, res));
}
exports.routes = routes;
//# sourceMappingURL=routesFunction.js.map