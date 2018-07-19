import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { CacheState } from 'apollo-angular-cache-ngrx/types';
import { coreStateSelector } from '../../core/store/core.selectors';

export const apolloFeatureKey = 'apollo';
export const apolloSelector: MemoizedSelector<any, CacheState> = createFeatureSelector<CacheState>(apolloFeatureKey);
export const rootSubscirptionSelector = createSelector(apolloSelector, apolloState => apolloState.ROOT_SUBSCRIPTION);
export const messageAddedSelector = createSelector(rootSubscirptionSelector, rootSelector => rootSelector ? rootSelector.messageAdded : null);
