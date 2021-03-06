import { ICoreState } from '../../shared/interfaces/core.interfaces';
import { CacheState } from 'apollo-angular-cache-ngrx/types';

export interface IGoldAppState {
  core: ICoreState;
  apollo: CacheState;
}
