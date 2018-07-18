import { MissionRoutesManager } from "./missionRoutesManager";
import { MissionMethods } from "../dbModule/methods/mission.method";
import { Mission } from "../dbModule/schemas/mission.schema";
import { MissionPaths } from '../../../shared/src/paths/mission.paths';


export function routes(app, logService) {
  const missionMethods = new MissionMethods(Mission, logService);
  const missionRoutesManager = new MissionRoutesManager(missionMethods, "mission", logService);
  //todo check why bind doesn't work...?
  app.get(MissionPaths.test,  (req, res ) => missionRoutesManager.test(req, res));
  app.post(MissionPaths.getMissionById, (req, res ) => missionRoutesManager.getById(req, res));
  app.get(MissionPaths.getAllMission, (req, res) => missionRoutesManager.getAll(req, res));
  app.post(MissionPaths.addMission, (req, res) => missionRoutesManager.add(req, res));
  app.get(MissionPaths.updateMission, (req, res) => missionRoutesManager.update(req, res));
  app.get(MissionPaths.updateMissionField, (req, res) => missionRoutesManager.updateField(req, res));
  app.get(MissionPaths.removeMission, (req, res) => missionRoutesManager.remove(req, res));
}
