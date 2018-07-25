import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IMissionState, Mission } from '../interfaces/mission.state';

export const missionFeatureKey = 'mission';

export const missionStateSelector : MemoizedSelector<any, IMissionState> = createFeatureSelector<IMissionState>(missionFeatureKey);
export const missionsSelector = createSelector(missionStateSelector, (missionState : IMissionState) => missionState.missions);

export const firstMissionSelector = createSelector(missionsSelector, (missionState : Array<Mission>) => missionState[0]);
export const missionNameSelector = createSelector(firstMissionSelector, (missionState : Mission) => missionState.name);
export const missionTagListSelector = createSelector(firstMissionSelector, (missionState : Mission) => missionState.tagList);
export const missionDescriptionSelector = createSelector(firstMissionSelector, (missionState: Mission) => missionState.description);
//
//
