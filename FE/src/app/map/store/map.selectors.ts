import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';


export const mapFeatureKey = 'map';
export const mapStateSelector: MemoizedSelector<any, any> = createFeatureSelector<any>(mapFeatureKey);
// export const testSelector = createSelector(mapStateSelector, (core)=> core.name);
