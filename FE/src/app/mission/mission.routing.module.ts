import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionManagementComponent } from '@goldStar/mission/components/missionManagement/missionManagement.component';


const routes: Routes = [
  {
    path: '',
    component: MissionManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
