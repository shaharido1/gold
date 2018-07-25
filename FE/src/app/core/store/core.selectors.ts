import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ICoreState } from '../../shared/interfaces/core.interfaces';
import { CacheState } from 'apollo-angular-cache-ngrx/types';

export const coreFeatureKey = 'core';
export const coreStateSelector: MemoizedSelector<any, ICoreState> = createFeatureSelector<ICoreState>(coreFeatureKey);
export const testSelector = createSelector(coreStateSelector, core => core.name);
export const membersSelector  = createSelector(coreStateSelector, core=> core.members);



export const apolloFeatureKey = 'apollo';
export const apolloSelector: MemoizedSelector<any, CacheState> = createFeatureSelector<CacheState>(apolloFeatureKey);
