import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IMapState } from '../interfaces/map.interfaces';


export const mapFeatureKey = 'map';
export const mapStateSelector: MemoizedSelector<any, IMapState> = createFeatureSelector<IMapState>(mapFeatureKey);
export const entitiesSelector = createSelector(mapStateSelector, (core)=> core.entities);
