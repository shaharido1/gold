import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ICoreState } from '../interfaces/core.interfaces';
import { CacheState } from 'apollo-angular-cache-ngrx/types';

export const coreFeatureKey = 'core';
export const coreStateSelector: MemoizedSelector<any, ICoreState> = createFeatureSelector<ICoreState>(coreFeatureKey);
export const testSelector = createSelector(coreStateSelector, core => core.name);

export const apolloFeatureKey = 'apollo';
export const apolloSelector: MemoizedSelector<any, CacheState> = createFeatureSelector<CacheState>(apolloFeatureKey);
