import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: '../login/login.module#LoginModule'
  },
  {
    path: 'missions',
    loadChildren: '../missions/missions.module#MissionModule'
  },
  {
    path: 'main',
    loadChildren: '../main/main.module#MainModule'
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
