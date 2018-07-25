import { RouterModule, Routes } from '@angular/router';
import { coreFeatureKey } from '@goldStar/core/store/core.selectors';
import { TagsComponent } from '@goldStar/shared/components/tags/tags.component';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { coreReducer } from '@goldStar/core/store/core.reducer';
import { MembersComponent } from '@goldStar/shared/components/members/members.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: 'home', redirectTo: 'login', pathMatch: 'full'},
];


@NgModule({
  declarations: [
    TagsComponent,
    MembersComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(coreFeatureKey, coreReducer),
    RouterModule.forChild(routes),
  ],
  exports: [
    TagsComponent,
    MembersComponent,
  ],
})

export class SharedModule {
}
