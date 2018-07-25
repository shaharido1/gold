import { MissionPaths } from '../../../../../shared/src/paths/mission.paths';
import { MissionServer } from '../../../../../shared/src/paths/servers.paths';
import axios from 'axios';
import { CHANNEL_MISSION_ADDED } from './mission.typesDef';

export class MissionService {


  missionTestQuery() {
    return axios.get(MissionServer + MissionPaths.test).then(res => res.data);
  }

  getMission() {
    return axios.get(MissionServer + MissionPaths.getMissionById).then(res => res.data)
  }
  getAllMissions() {
    return axios.get(MissionServer + MissionPaths.getAllMission).then(res => res.data)
  }

  addMission(root, { mission }) {
      return axios.post(MissionServer + MissionPaths.addMission, { mission }).then(res => {
        this.pubSub.publish(CHANNEL_MISSION_ADDED, res.data);
        console.log(res.data);
        return res
      })
  }

  missionSubscription() {
    this.pubSub.asyncIterator(CHANNEL_MISSION_ADDED)
  }

  pubSub;
  constructor(pubSub) {
    this.pubSub = pubSub;
  }
}