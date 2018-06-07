import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { CacheState } from 'apollo-angular-cache-ngrx/types';


export const apolloFeatureKey = 'apollo';
export const apolloSelector: MemoizedSelector<any, CacheState> = createFeatureSelector<CacheState>(apolloFeatureKey);
