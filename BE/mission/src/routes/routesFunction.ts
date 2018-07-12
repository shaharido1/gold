import { paths } from "./paths";
import { MissionRoutesManager } from "./missionRoutesManager";
import { MissionMethods } from "../dbModule/methods/mission.method";
import { Mission } from "../dbModule/schemas/mission.schema";
const { logService } = require("../server");

const missionMethods = new MissionMethods(Mission, logService);
const missionRoutesManager = new MissionRoutesManager(missionMethods, "mission", logService);

export function routes(app) {

  app.get(paths.test,  (req, res ) => missionRoutesManager.test(req, res));
  app.post(paths.getMissionById, (req, res ) => missionRoutesManager.getById(req, res));
  app.get(paths.getAllMission, (req, res) => missionRoutesManager.getAll(req, res));
  app.post(paths.addMission, (req, res) => missionRoutesManager.add(req, res));
  app.get(paths.updateMission, (req, res) => missionRoutesManager.update(req, res));
  app.get(paths.updateMissionField, (req, res) => missionRoutesManager.updateField(req, res));
  app.get(paths.removeMission, (req, res) => missionRoutesManager.remove(req, res));



}
