import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IMapState } from '../interfaces/map.interfaces';

export const mapFeatureKey = 'map';
export const mapStateSelector: MemoizedSelector<any, IMapState> = createFeatureSelector<IMapState>(mapFeatureKey);
// export const testSelector = createSelector(mapStateSelector, (core)=> core.name);
