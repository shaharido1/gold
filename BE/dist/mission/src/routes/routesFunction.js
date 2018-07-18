"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missionRoutesManager_1 = require("./missionRoutesManager");
const mission_method_1 = require("../dbModule/methods/mission.method");
const mission_schema_1 = require("../dbModule/schemas/mission.schema");
const mission_paths_1 = require("../../../shared/src/paths/mission.paths");
function routes(app, logService) {
    const missionMethods = new mission_method_1.MissionMethods(mission_schema_1.Mission, logService);
    const missionRoutesManager = new missionRoutesManager_1.MissionRoutesManager(missionMethods, "mission", logService);
    //todo check why bind doesn't work...?
    app.get(mission_paths_1.MissionPaths.test, (req, res) => missionRoutesManager.test(req, res));
    app.post(mission_paths_1.MissionPaths.getMissionById, (req, res) => missionRoutesManager.getById(req, res));
    app.get(mission_paths_1.MissionPaths.getAllMission, (req, res) => missionRoutesManager.getAll(req, res));
    app.post(mission_paths_1.MissionPaths.addMission, (req, res) => missionRoutesManager.add(req, res));
    app.get(mission_paths_1.MissionPaths.updateMission, (req, res) => missionRoutesManager.update(req, res));
    app.get(mission_paths_1.MissionPaths.updateMissionField, (req, res) => missionRoutesManager.updateField(req, res));
    app.get(mission_paths_1.MissionPaths.removeMission, (req, res) => missionRoutesManager.remove(req, res));
}
exports.routes = routes;
//# sourceMappingURL=routesFunction.js.map