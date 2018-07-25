import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMissionState } from '../interfaces/mission.state';

@Injectable()
export class MissionEffects {
  constructor(protected actions$: Actions, protected store$: Store<IMissionState>) {
  }
}
