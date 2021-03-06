import { MissionServer } from './servers.paths';


const MISSION = '/missions';


export const MissionPaths  = {
  test: MISSION + "/test",
  getMissionById : MISSION + "/getById",
  getAllMission: MISSION + "/getAll",
  addMission: MISSION + "/add",
  updateMission: MISSION + "/update",
  updateMissionField: MISSION + "/updateField",
  removeMission: MISSION + "/remove"
};
