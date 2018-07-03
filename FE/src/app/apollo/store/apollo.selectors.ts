import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { CacheState } from 'apollo-angular-cache-ngrx/types';
import { coreStateSelector } from '../../core/store/core.selectors';


export const apolloFeatureKey = 'apollo';
export const apolloSelector: MemoizedSelector<any, CacheState> = createFeatureSelector<CacheState>(apolloFeatureKey);
export const rootSubscirptionSelector = createSelector(apolloSelector, (apolloState)=> apolloState.ROOT_SUBSCRIPTION);
export const messageAddedSelector :  MemoizedSelector<any, any> = createSelector(rootSubscirptionSelector, (rootSelector)=> rootSelector? rootSelector.messageAdded : null);

export const createSelectorGetEntityById = (id) => createSelector(apolloSelector, (apolloState) => {return apolloState[id] || null});

export const getPositionSelector = createSelector(apolloSelector, (apolloState) => apolloState[0]);
