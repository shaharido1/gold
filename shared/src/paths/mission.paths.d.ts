export declare const MissionPaths: MissionPath;
export interface MissionPath {
    test: string;
    getMissionById: string;
    getAllMission: string;
    addMission: string;
    updateMission: string;
    updateMissionField: string;
    removeMission: string;
}
export declare function missionPath(missionPath: string, fullUrl?: any): string;
