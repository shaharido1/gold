import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { MissionRoutingModule } from './mission.routing.module';
import { MissionReducer } from './store/mission.reducer';
import { missionFeatureKey } from './store/mission.selectors';
import { MissionEffects } from './store/mission.effects';
import { SelectStatusComponent } from './components/selectStatus/selectStatus.component';
import { MissionsViewComponent } from '@goldStar/mission/components/missionsView/missionsView.component';
import { MissionEditorComponent } from '@goldStar/mission/components/missionEditor/missionEditor.components';
import { MissionManagementComponent } from '@goldStar/mission/components/missionManagement/missionManagement.component';
import { SharedModule } from '@goldStar/shared/shared.module';

@NgModule({
  declarations: [
    MissionEditorComponent,
    SelectStatusComponent,
    MissionsViewComponent,
    MissionManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MissionRoutingModule,
    StoreModule.forFeature(missionFeatureKey, MissionReducer),
    EffectsModule.forFeature([MissionEffects])
  ]
})

export class MissionModule { }
